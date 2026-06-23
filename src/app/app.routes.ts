import { Routes } from "@angular/router";
import { LoginUserComponent } from "./login/login-user/login-user.component";
import { RegisterUserComponent } from "./register/register-user/register-user.component";
import { authGuard } from "./guards/auth.guard";
import { DashboardUserComponent } from "./dashboard/dashboard-user/dashboard-user.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginUserComponent },
  { path: "register", component: RegisterUserComponent },
  {
    path: "dashboard",
    component: DashboardUserComponent,
    canActivate: [authGuard], // <- this triggers autoAuthenticate() automatically on navigation
  },
];
