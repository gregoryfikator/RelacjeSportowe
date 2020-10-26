import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { TopNavigationMenuComponent } from './components/top-navigation-menu/top-navigation-menu.component';
import { SubNavigationMenuComponent } from './components/sub-navigation-menu/sub-navigation-menu.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    TopNavigationMenuComponent,
    SubNavigationMenuComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
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
