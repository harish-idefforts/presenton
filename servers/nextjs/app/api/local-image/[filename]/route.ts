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
  const filePath = path.join(appData, 'uploads', 'images', filename);
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return new NextResponse('Not found', { status: 404 });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }

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
