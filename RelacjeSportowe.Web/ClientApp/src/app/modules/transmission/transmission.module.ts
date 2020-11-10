import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransmissionRoutingModule } from './transmission-routing.module';
import { TransmissionDashboardComponent } from './components/transmission-dashboard/transmission-dashboard.component';
import { RouterModule } from '@angular/router';
import { TransmissionComponent } from './transmission.component';



@NgModule({
  declarations: [
    TransmissionComponent,
    TransmissionDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransmissionRoutingModule,
    RouterModule
  ]
})
export class TransmissionModule { }
