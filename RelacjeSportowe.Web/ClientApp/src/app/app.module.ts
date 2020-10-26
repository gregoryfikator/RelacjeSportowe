import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ApiAuthorizationModule } from './modules/api-authorization/api-authorization.module';
import { HomeModule } from './modules/home/home.module';

import { AppComponent } from './app.component';
import { AuthorizeInterceptor } from './modules/api-authorization/authorize.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    SharedModule,
    HomeModule,
    HttpClientModule,
    ApiAuthorizationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
