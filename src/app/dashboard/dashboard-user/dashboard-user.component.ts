import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth-login-service/auth.service";
import { MicrosoftService } from "../../services/microsoft-login-service/microsoft.service";

@Component({
  selector: "app-dashboard-user",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard-user.component.html",
  styleUrl: "./dashboard-user.component.scss",
})
export class DashboardUserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private microsoftService: MicrosoftService,
  ) {}

  ngOnInit(): void {
    this.authService.getAppConfig().subscribe({
      next: (config) => {
        console.log("App Config Data here -->", config);
      },
      error: (err) => {
        console.error("Failed to load app config", err);
      },
    });

    this.microsoftService.getCurrentUser().subscribe({
      next: (user) => console.log("Microsoft current user -->", user),
      error: (err) => console.error("Failed to fetch /auth/me", err),
    });

    this.microsoftService.getAllUsers().subscribe({
      next: (users) => console.log("All Users -->", users),
      error: (err) => console.log("Failed to fetch users", err),
    });
  }
}
