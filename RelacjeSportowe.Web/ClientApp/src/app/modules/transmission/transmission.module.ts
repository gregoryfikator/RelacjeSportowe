import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransmissionRoutingModule } from './transmission-routing.module';
import { TransmissionDashboardComponent } from './components/transmission-dashboard/transmission-dashboard.component';
import { RouterModule } from '@angular/router';
import { TransmissionComponent } from './transmission.component';
import { MyTransmissionsComponent } from './components/my-transmissions/my-transmissions.component';
import { AllTransmissionsComponent } from './components/all-transmissions/all-transmissions.component';
import { LiveTransmissionPanelComponent } from './components/live-transmission-panel/live-transmission-panel.component';
import { LiveTransmissionCasterPanelComponent } from './components/live-transmission-caster-panel/live-transmission-caster-panel.component';
import { AddTransmissionComponent } from './components/add-transmission/add-transmission.component';
import { EditTransmissionComponent } from './components/edit-transmission/edit-transmission.component';
import { LiveTransmissionComponent } from './components/live-transmission/live-transmission.component';



@NgModule({
  declarations: [
    TransmissionComponent,
    TransmissionDashboardComponent,
    MyTransmissionsComponent,
    AllTransmissionsComponent,
    LiveTransmissionPanelComponent,
    LiveTransmissionCasterPanelComponent,
    AddTransmissionComponent,
    EditTransmissionComponent,
    LiveTransmissionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransmissionRoutingModule,
    RouterModule
  ]
})
export class TransmissionModule { }
