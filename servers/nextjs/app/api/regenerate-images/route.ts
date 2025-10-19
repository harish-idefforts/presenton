import { NextRequest, NextResponse } from 'next/server'

type Target = { parentPath: string; urlPath: string }

function collectTargets(obj: any, base = ''): Target[] {
  const results: Target[] = []
  if (obj == null || typeof obj !== 'object') return results
  const hasImgPrompt = typeof obj.__image_prompt__ === 'string' && obj.__image_prompt__.trim().length > 0
  if (hasImgPrompt) {
    results.push({ parentPath: base, urlPath: base ? `${base}.__image_url__` : '__image_url__' })
  }
  for (const [key, value] of Object.entries(obj)) {
    const current = base ? `${base}.${key}` : key
    if (Array.isArray(value)) {
      value.forEach((v, i) => results.push(...collectTargets(v, `${current}[${i}]`)))
    } else if (value && typeof value === 'object') {
      results.push(...collectTargets(value, current))
    }
  }
  return results
}

function setByPath(obj: any, path: string, newValue: string) {
  const tokens = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (let i = 0; i < tokens.length - 1; i++) {
    cur = cur[tokens[i] as any]
    if (cur == null) return
  }
  cur[tokens[tokens.length - 1] as any] = newValue
}

function getByPath(obj: any, path: string): any {
  if (!path) return obj
  const tokens = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean)
  let cur = obj
  for (const tk of tokens) {
    if (cur == null) return undefined
    cur = cur[tk as any]
  }
  return cur
}

async function cacheLocal(url: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/cache-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.url as string
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const FASTAPI_BASE = process.env.FASTAPI_BASE_URL || 'http://localhost:8000'

    const presRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/presentation/${id}`)
    if (!presRes.ok) return NextResponse.json({ error: 'Presentation not found' }, { status: 404 })
    const presentation = await presRes.json()

    let changed = false
    let regeneratedImages = 0

    for (const slide of presentation.slides || []) {
      const targets = collectTargets(slide.content)
      for (const t of targets) {
        const parent = t.parentPath ? getByPath(slide.content, t.parentPath) : slide.content
        const prompt = parent?.__image_prompt__
        if (typeof prompt === 'string' && prompt.trim().length > 0) {
          try {
            const genRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/images/generate?prompt=${encodeURIComponent(prompt)}`)
            if (genRes.ok) {
              const text = await genRes.text()
              let finalUrl: string | null = null
              if (/^https?:\/\//i.test(text)) {
                finalUrl = await cacheLocal(text)
              } else if (typeof text === 'string' && text.length > 0) {
                if (text.startsWith('/api/local-image/') || text.startsWith('/static/')) {
                  finalUrl = text
                } else {
                  const finRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/images/finalize`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: text })
                  })
                  if (finRes.ok) {
                    const data = await finRes.json().catch(() => ({} as any))
                    if (typeof (data as any).url === 'string') finalUrl = (data as any).url
                  }
                }
              }
              if (finalUrl) {
                setByPath(slide.content, t.urlPath, finalUrl)
                const isPlaceholder = finalUrl.startsWith('/static/images/placeholder')
                if (!isPlaceholder) regeneratedImages++
                changed = true
                continue
              }
            }
          } catch {}
        }
      }
    }

    if (changed) {
      const upRes = await fetch(`${FASTAPI_BASE}/api/v1/ppt/presentation/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(presentation)
      })
      if (!upRes.ok) return NextResponse.json({ error: 'update_failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id, updated: changed, regeneratedImages })
  } catch (e: any) {
    console.error('regenerate-images error', e)
    return NextResponse.json({ error: e?.message || 'failed' }, { status: 500 })
  }
}
