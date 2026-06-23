import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../interfaces/login.interface";
import { encryptPassword } from "../utils/encryption.util";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

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
            localStorage.setItem("accessToken", token);
          } else {
            console.error("No accessToken found in login response", response);
          }
        }),
      );
  }

  autoAuthenticate(): Observable<any> {
    const token = localStorage.getItem("accessToken");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.baseUrl}/api/auth/autoAuthenticate`, {
      headers,
    });
  }
}
