import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { routePaths } from "./common/constant/routers";
import createMiddleware from "next-intl/middleware";
import cookieKey from "./common/constant/cookies";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ROUTES = [
  routePaths.SIGN_IN,
  routePaths.SIGN_UP,
  routePaths.FORGOT_PASSWORD,
  routePaths.RESET_PASSWORD,
] as string[];

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  // Nếu intlMiddleware đã redirect (switch locale, etc.), return luôn
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  const pathname = request.nextUrl.pathname;

  // Lấy locale chính xác từ header mà next-intl đã set
  const locale =
    routing.locales.find((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) ??
    routing.defaultLocale;

  // Loại bỏ locale prefix để kiểm tra route thực tế
  const pathWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.slice(locale.length + 1) || "/"
    : pathname || "/";

  const isPublicBase = PUBLIC_ROUTES.includes(pathWithoutLocale);
  const isResetPasswordWithToken = pathWithoutLocale.startsWith(routePaths.RESET_PASSWORD + '/');
  const isPublic = isPublicBase || isResetPasswordWithToken;

  const token = request.cookies.get(cookieKey.TOKEN)?.value;

  // Chưa login → truy cập private route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(`/${locale}${routePaths.SIGN_IN}`, request.url));
  }

  // Đã login → truy cập public/auth pages
  if (token && isPublic) {
    return NextResponse.redirect(new URL(`/${locale}${routePaths.DASHBOARD}`, request.url));
  }

  // Các trường hợp còn lại: pass through intlResponse (đã có header locale)
  return intlResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
