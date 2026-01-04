import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { routePaths } from "./common/constant/routers";
import createMiddleware from "next-intl/middleware";
import cookieKey from "./common/constant/cookies";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_ROUTES = [routePaths.SIGN_IN, routePaths.SIGN_UP, routePaths.FORGOT_PASSWORD, routePaths.RESET_PASSWORD] as string[];

export default function middleware(request: NextRequest) {
  // 1. Chạy intlMiddleware trước để lấy locale chính xác (đã xử lý cookie)
  const intlResponse = intlMiddleware(request);

  // Nếu intlMiddleware đã redirect (ví dụ: 307 khi switch locale), return luôn
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  // Lấy locale từ header mà next-intl inject (đảm bảo là locale mới nhất)
  const locale = intlResponse.headers.get("x-next-intl-locale") || routing.defaultLocale;

  const pathname = request.nextUrl.pathname;

  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  const isPublic = PUBLIC_ROUTES.includes(pathWithoutLocale);

  const token = request.cookies.get(cookieKey.TOKEN)?.value;

  // Chưa login → vào private route
  if (!token && !isPublic) {
  request.nextUrl.pathname = routePaths.SIGN_IN;
  return NextResponse.redirect(request.nextUrl);
}

  // Đã login → vào auth pages (bỏ comment nếu cần)
  if (token && isPublic) {
  request.nextUrl.pathname = "/";
  return NextResponse.redirect(request.nextUrl);
}

  // Các trường hợp còn lại: return intlResponse đã xử lý
  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
