import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
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
          localStorage.setItem("accessToken", response?.data?.accessToken);
        }),
      );
  }
}
