import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to download image: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const uploadsBase = process.env.APP_DATA_DIRECTORY || '/app/user_data';
    const imagesDir = path.join(uploadsBase, 'uploads', 'images');
    fs.mkdirSync(imagesDir, { recursive: true });

    const extFromUrl = (() => {
      try {
        const u = new URL(url);
        const m = /\.(png|jpe?g|webp|gif|svg)(?:$|\?)/i.exec(u.pathname);
        return m ? `.${m[1].toLowerCase()}` : '.jpg';
      } catch {
        return '.jpg';
      }
    })();

    const filename = `${crypto.randomBytes(16).toString('hex')}${extFromUrl}`;
    const filePath = path.join(imagesDir, filename);

    const buf = await downloadBuffer(url);
    fs.writeFileSync(filePath, buf);

    const publicUrl = `/api/local-image/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (e: any) {
    console.error('cache-image error', e);
    return NextResponse.json({ error: e?.message || 'Failed to cache image' }, { status: 500 });
  }
}

