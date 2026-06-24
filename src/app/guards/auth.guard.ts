import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth-login-service/auth.service";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Calls the API to verify the stored token is still valid
  return authService.autoAuthenticate().pipe(
    map(() => true), // Token valid -> allow access (user is "auto logged in")
    catchError(() => {
      // token invalid/expired -> send back to login
      router.navigate(["/login"]);
      return of(false);
    }),
  );
};
