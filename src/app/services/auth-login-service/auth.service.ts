import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { LoginResponse } from "../../interfaces/login.interface";
import { encryptPassword } from "../../utils/encryption.util";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.BASE_URL;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(
    emailId: string,
    plainPassword: string,
    rememberMe: boolean = false,
  ): Observable<LoginResponse> {
    const encryptedPassword = encryptPassword(plainPassword);

    const body = {
      email_id: emailId,
      password: encryptedPassword,
      remember_me: rememberMe,
    };

    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/auth/login`, body)
      .pipe(
        tap((response) => {
          const token = response?.data?.accessToken;
          if (token) {
            // localStorage.setItem("accessToken", token);
            this.cookieService.set("accessToken", token, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });
          } else {
            console.error("No accessToken found in login response", response);
          }
        }),
      );
  }

  autoAuthenticate(): Observable<any> {
    // const token = localStorage.getItem("accessToken");

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    // return this.http.get(`${this.baseUrl}/api/auth/autoAuthenticate`, {
    //   headers,
    // });

    // no manual header needed anymore — authInterceptor attaches it automatically
    return this.http.get(`${this.baseUrl}/api/auth/autoAuthenticate`);
  }

  getAppConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/app-config`);
  }
}
