import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth-login-service/auth.service";

@Component({
  selector: "app-dashboard-user",
  standalone: true,
  imports: [],
  templateUrl: "./dashboard-user.component.html",
  styleUrl: "./dashboard-user.component.scss",
})
export class DashboardUserComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAppConfig().subscribe({
      next: (config) => {
        console.log("App Config Data here -->", config);
      },
      error: (err) => {
        console.error("Failed to load app config", err);
      },
    });
  }
}
