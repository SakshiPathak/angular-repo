import { Component } from "@angular/core";
import { MicrosoftService } from "../../services/microsoft-login-service/microsoft.service";

@Component({
  selector: "app-microsoft-login",
  standalone: true,
  imports: [],
  templateUrl: "./microsoft-login.component.html",
  styleUrl: "./microsoft-login.component.scss",
})
export class MicrosoftLoginComponent {
  constructor(private microsoftLoginService: MicrosoftService) {}

  onMicrosoftLogin(): void {
    this.microsoftLoginService.redirectToMicrosoftLogin();
  }
}
