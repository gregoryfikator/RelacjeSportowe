import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "src/app/app.constants";
import { AdministratorGuard } from "src/app/shared/guards/administrator.guard";
import { AfterLoginGuard } from "src/app/shared/guards/after-login.guard";
import { AuthorizeGuard } from "../api-authorization/authorize.guard";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Empty,
    redirectTo: Constants.Routing.BasicPaths.Home,
    pathMatch: 'full'
  },
  {
    path: Constants.Routing.BasicPaths.Administration,
    loadChildren: () => import('../../modules/administration/administration.module').then(m => m.AdministrationModule),
    canLoad: [AdministratorGuard]
  },
  {
    path: Constants.Routing.BasicPaths.Home,
    component: HomeComponent
  },
  {
    path: Constants.Routing.BasicPaths.Leaderboard,
    loadChildren: () => import('../../modules/leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
    canLoad: [AuthorizeGuard]
  },
  {
    path: Constants.Routing.BasicPaths.Login,
    component: LoginComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: Constants.Routing.BasicPaths.Register,
    component: RegisterComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: Constants.Routing.BasicPaths.Transmission,
    loadChildren: () => import('../../modules/transmission/transmission.module').then(m => m.TransmissionModule),
    canLoad: [AuthorizeGuard]
  },
  {
    path: Constants.Routing.BasicPaths.User,
    loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule),
    canLoad: [AuthorizeGuard]
  },
  {
    path: "**",
    redirectTo: Constants.Routing.BasicPaths.Home
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }