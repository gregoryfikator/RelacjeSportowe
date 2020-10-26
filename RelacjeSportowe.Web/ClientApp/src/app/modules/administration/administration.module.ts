import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationDashboardComponent } from './components/administration-dashboard/administration-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationComponent } from './administration.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    AdministrationDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
