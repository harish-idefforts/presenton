import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_IMAGE_DOMAINS = [
  'pixabay.com',
  'images.unsplash.com',
  'unsplash.com',
  'pexels.com',
  'cdn.pixabay.com',
];

function isExternalImageUrl(url?: string) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('/api/local-image/')) return false;
  try {
    const u = new URL(url);
    return EXTERNAL_IMAGE_DOMAINS.some((d) => u.hostname.includes(d));
  } catch {
    return false;
  }
}

type Item = { path: string; url: string; kind: 'image'|'icon'; parentPath: string };

function traverseAndCollect(obj: any, paths: string[] = [], basePath = ''): Item[] {
  if (obj == null || typeof obj !== 'object') return paths as any;
  const results: Item[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const current = basePath ? `${basePath}.${key}` : key;
    if (key === '__image_url__' && typeof value === 'string' && isExternalImageUrl(value)) {
      const parentPath = current.replace(/\.__image_url__$/, '');
      results.push({ path: current, url: value, kind: 'image', parentPath });
    } else if (key === '__icon_url__' && typeof value === 'string' && isExternalImageUrl(value)) {
      const parentPath = current.replace(/\.__icon_url__$/, '');
      results.push({ path: current, url: value, kind: 'icon', parentPath });
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        results.push(...traverseAndCollect(v, paths, `${current}[${i}]`));
      });
    } else if (value && typeof value === 'object') {
      results.push(...traverseAndCollect(value, paths, current));
    }
  }
  return results;
}

function setByPath(obj: any, path: string, newValue: string) {
  const tokens = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  let cur = obj;
  for (let i = 0; i < tokens.length - 1; i++) {
    cur = cur[tokens[i] as any];
    if (cur == null) return;
  }
  cur[tokens[tokens.length - 1] as any] = newValue;
}

function getByPath(obj: any, path: string): any {
  const tokens = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  let cur = obj;
  for (const tk of tokens) {
    if (cur == null) return undefined;
    cur = cur[tk as any];
  }
  return cur;
}

async function cacheOne(url: string): Promise<string | null> {
  try {
    // Cache images through our own Next.js route (same origin)
    const res = await fetch(`/api/cache-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ids, limit = 50, offset = 0 } = await req.json().catch(() => ({}));

    // Resolve FastAPI base URL explicitly to avoid hitting Next.js itself
    const FASTAPI_BASE = process.env.FASTAPI_BASE_URL || 'http://localhost:8000';

    // Fetch list of presentations
    const allRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/presentation/all`);
    if (!allRes.ok) return NextResponse.json({ error: 'Failed to fetch presentations' }, { status: 500 });
    const all = await allRes.json();

    const list = Array.isArray(ids) && ids.length > 0
      ? all.filter((p: any) => ids.includes(p.id))
      : all.slice(offset, offset + limit);

    const results: any[] = [];

    for (const p of list) {
      try {
        const presRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/presentation/${p.id}`);
        if (!presRes.ok) continue;
        const presentation = await presRes.json();

        let changed = false;
        let cachedCount = 0;
        let regeneratedCount = 0;
        for (const slide of presentation.slides || []) {
          const items = traverseAndCollect(slide.content);
          for (const item of items) {
            // Try caching existing URL
            const cached = await cacheOne(item.url);
            if (cached) {
              setByPath(slide.content, item.path, cached);
              changed = true;
              cachedCount++;
              continue;
            }

            // Regenerate when possible
            const parent: any = getByPath(slide.content, item.parentPath) || {};
            if (item.kind === 'image' && typeof parent.__image_prompt__ === 'string' && parent.__image_prompt__.trim().length > 0) {
              try {
                const prompt = encodeURIComponent(parent.__image_prompt__);
                const genRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/images/generate?prompt=${prompt}`);
                if (genRes.ok) {
                  const text = await genRes.text();
                  let finalUrl: string | null = null;
                  if (/^https?:\/\//i.test(text)) {
                    finalUrl = await cacheOne(text);
                  } else if (typeof text === 'string' && text.length > 0) {
                    const finRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/images/finalize`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ path: text })
                    });
                    if (finRes.ok) {
                      const data = await finRes.json().catch(() => ({} as any));
                      if (typeof (data as any).url === 'string') finalUrl = (data as any).url;
                    }
                  }
                  if (finalUrl) {
                    setByPath(slide.content, item.path, finalUrl);
                    changed = true;
                    regeneratedCount++;
                    continue;
                  }
                }
              } catch {}
            } else if (item.kind === 'icon' && typeof parent.__icon_query__ === 'string' && parent.__icon_query__.trim().length > 0) {
              try {
                const q = encodeURIComponent(parent.__icon_query__);
                const iconRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/icons/search?query=${q}&limit=1`);
                if (iconRes.ok) {
                  const arr = await iconRes.json();
                  if (Array.isArray(arr) && typeof arr[0] === 'string') {
                    setByPath(slide.content, item.path, arr[0]);
                    changed = true;
                    regeneratedCount++;
                    continue;
                  }
                }
              } catch {}
            }
          }
        }

        if (changed) {
          // Update the presentation content
          const upRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/presentation/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(presentation),
          });
          if (!upRes.ok) {
            results.push({ id: p.id, updated: false, reason: 'update_failed', cached: cachedCount, regenerated: regeneratedCount });
          } else {
            results.push({ id: p.id, updated: true, cached: cachedCount, regenerated: regeneratedCount });
          }
        } else {
          results.push({ id: p.id, updated: false, reason: 'no external images', cached: cachedCount, regenerated: regeneratedCount });
        }
      } catch (e: any) {
        results.push({ id: p.id, updated: false, reason: e?.message || 'error' });
      }
    }

    return NextResponse.json({ success: true, processed: results.length, results });
  } catch (e: any) {
    console.error('migrate-external-images error', e);
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 });
  }
}
