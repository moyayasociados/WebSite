import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: { getAll: () => request.cookies.getAll(), setAll: (cookiesToSet) => { cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name,value)); response = NextResponse.next({ request }); cookiesToSet.forEach(({ name,value,options }) => response.cookies.set(name,value,options)); } }
  });
  if (request.nextUrl.pathname.startsWith('/portal') || request.nextUrl.pathname.startsWith('/api/admin')) {
    const { data } = await supabase.auth.getUser();
    if (!data.user && !request.nextUrl.pathname.startsWith('/portal/login')) {
      return NextResponse.redirect(new URL('/portal/login', request.url));
    }
  }
  return response;
}
export const config = { matcher: ['/portal/:path*','/api/admin/:path*'] };
