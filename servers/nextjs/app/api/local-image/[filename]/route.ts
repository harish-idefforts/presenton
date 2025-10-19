import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  if (!filename || /[^a-zA-Z0-9_.-]/.test(filename)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const appData = process.env.APP_DATA_DIRECTORY || '/app/user_data';
  const candidates: string[] = [];
  candidates.push(path.join(appData, 'uploads', 'images', filename));
  candidates.push(path.join(appData, 'images', filename));
  candidates.push(path.join(process.cwd(), 'app_data', 'uploads', 'images', filename));
  candidates.push(path.join(process.cwd(), 'uploads', 'images', filename));

  let filePath: string | null = null;
  for (const p of candidates) {
    try {
      const stat = fs.statSync(p);
      if (stat.isFile()) {
        filePath = p;
        break;
      }
    } catch {}
  }

  if (!filePath) return new NextResponse('Not found', { status: 404 });

  const ext = path.extname(filename).toLowerCase();
  const contentType =
    ext === '.png' ? 'image/png' :
    ext === '.webp' ? 'image/webp' :
    ext === '.gif' ? 'image/gif' :
    ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';

  const stream = fs.createReadStream(filePath);
  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
