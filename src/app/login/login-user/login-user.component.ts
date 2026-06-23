import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule, NgForm } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-login-user",
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: "./login-user.component.html",
  styleUrl: "./login-user.component.scss",
})
export class LoginUserComponent {
  emailId = "";
  password = "";
  rememberMe = false;
  errorMessage = "";
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.invalid) {
      loginForm.form.markAllAsTouched();
      return;
    }

    this.errorMessage = "";
    this.isLoading = true;

    this.authService
      .login(this.emailId, this.password, this.rememberMe)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log("Login Successful", response);
          this.router.navigate(["/dashboard"]);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err.message || "Login failed. Please check your credentials.";
          console.error("Login error", err);
        },
      });
  }

  // onSubmit(): void {
  //   this.errorMessage = "";
  //   this.isLoading = true;

  //   this.authService
  //     .login(this.emailId, this.password, this.rememberMe)
  //     .subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         console.log("Login Successful", response);
  //         this.router.navigate(["/dashboard"]);
  //       },
  //       error: (err) => {
  //         this.isLoading = false;
  //         this.errorMessage =
  //           err.message || "Login failed. Please check your credentials.";
  //         console.error("Login error", err);
  //       },
  //     });
  // }
}
