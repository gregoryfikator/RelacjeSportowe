import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationDashboardComponent } from './components/administration-dashboard/administration-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationComponent } from './administration.component';
import { TransmissionEventTypesListComponent } from './components/dictionaries/transmission-event-types-list/transmission-event-types-list.component';
import { AddTransmissionEventTypeComponent } from './components/dictionaries/transmission-event-type/add-transmission-event-type/add-transmission-event-type.component';
import { EditTransmissionEventTypeComponent } from './components/dictionaries/transmission-event-type/edit-transmission-event-type/edit-transmission-event-type.component';
import { UserRolesListComponent } from './components/roles/user-roles-list/user-roles-list.component';
import { ChangeUserRoleComponent } from './components/roles/change-user-role/change-user-role.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    AdministrationDashboardComponent,
    TransmissionEventTypesListComponent,
    AddTransmissionEventTypeComponent,
    EditTransmissionEventTypeComponent,
    UserRolesListComponent,
    ChangeUserRoleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
