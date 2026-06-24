import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = "Something went wrong. Please try again.";

      if (error.status === 0) {
        message = "Unable to reach the server. Please check your connection.";
      } else {
        switch (error.status) {
          case 400:
            message = error.error?.message || "Invalid Request";
            break;
          case 401:
            message =
              error.error?.message || "Session expired. Please login again.";
            // localStorage.removeItem("accessToken");
            cookieService.delete("accessToken");
            router.navigate(["/login"]);
            break;
          case 403:
            message =
              error.error?.message ||
              "You do not have permission to perform this action.";
            break;
          case 404:
            message = error.error?.message || "Resource not found.";
            break;
          case 500:
            message =
              error.error?.message || "Server error. Please try again later.";
            break;
          default:
            message = error.error?.message || message;
        }
      }

      console.error("HTTP Error:", error);

      // Pass the friendly message along so components can display it,
      // while still letting the error propagate to the calling code.
      return throwError(() => ({ ...error, message }));
    }),
  );
};
