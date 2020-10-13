import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class HomeModule { }
