import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "./app.constants";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { AuthorizeGuard } from "./modules/api-authorization/authorize.guard";
import { HomeComponent } from "./modules/home/components/home/home.component";
import { LoginComponent } from "./modules/home/components/login/login.component";
import { RegisterComponent } from "./modules/home/components/register/register.component";

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Home,
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: Constants.Routing.BasicPaths.Login,
    component: LoginComponent
  },
  {
    path: Constants.Routing.BasicPaths.Register,
    component: RegisterComponent
  },
  {
    path: Constants.Routing.BasicPaths.User,
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canLoad: [AuthorizeGuard]
  },
  {
    path: Constants.Routing.BasicPaths.Transmission,
    loadChildren: () => import('./modules/transmission/transmission.module').then(m => m.TransmissionModule),
    canLoad: [AuthorizeGuard]
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'fetch-data',
    component: FetchDataComponent
  },
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
export class AppRoutingModule { }