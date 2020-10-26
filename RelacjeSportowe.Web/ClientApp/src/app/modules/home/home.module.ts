import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { TopNavigationMenuComponent } from './components/top-navigation-menu/top-navigation-menu.component';
import { SubNavigationMenuComponent } from './components/sub-navigation-menu/sub-navigation-menu.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserInfoMenuItemComponent } from './components/menu-items/user-info-menu-item/user-info-menu-item.component';

@NgModule({
  declarations: [
    TopNavigationMenuComponent,
    SubNavigationMenuComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoMenuItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    TopNavigationMenuComponent,
    SubNavigationMenuComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class HomeModule { }
