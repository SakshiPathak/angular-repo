import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MicrosoftService {
  private sisBaseUrl = environment.SIS_BASE_URL;

  constructor(private http: HttpClient) {}

  redirectToMicrosoftLogin(): void {
    const returnTo = `${window.location.origin}/dashboard`;
    const params = new HttpParams().set("returnTo", returnTo);
    const loginUrl = `${this.sisBaseUrl}/auth/microsoft/login?${params.toString()}`;
    // const loginUrl = `${this.sisBaseUrl}/auth/microsoft/login?returnTo=${encodeURIComponent(returnTo)}`;
    window.location.href = loginUrl;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.sisBaseUrl}/auth/me`, {
      withCredentials: true,
    });
  }
}
