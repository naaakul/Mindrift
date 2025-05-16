
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
