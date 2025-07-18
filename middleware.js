import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host')

  // DOMAIN UTAMA
  const PUBLIC_DOMAIN = 'desamenur.com'

  // Jika subdomain adalah admin.desamenur.com, arahkan semua ke /admin
  if (hostname?.startsWith('admin.')) {
    // Jika hanya mengakses '/', arahkan ke dashboard admin
    if (url.pathname === '/') {
      url.pathname = '/admin/dashboard'
    } else if (!url.pathname.startsWith('/admin')) {
      // Tambahkan prefix /admin untuk semua path
      url.pathname = `/admin${url.pathname}`
    }
    return NextResponse.rewrite(url)
  }

  // Jika buka admin dari domain utama, tolak
  if (hostname === PUBLIC_DOMAIN && url.pathname.startsWith('/admin')) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|_vercel|static|favicon.ico|api|laravel-api).*)'],
}
