import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

// Endpoints that should NOT get the Authorization header attached
const SKIP_AUTH_URLS = ["/api/auth/login"];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const shouldSkip = SKIP_AUTH_URLS.some((url) => req.url.includes(url));

  if (shouldSkip) return next(req);

  // const token = localStorage.getItem("accessToken");
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const token = isBrowser ? localStorage.getItem("accessToken") : null;

  if (token) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloneReq);
  }

  return next(req);
};
