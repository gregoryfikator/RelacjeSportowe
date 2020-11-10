import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { AdministrationComponent } from './administration.component';
import { AdministrationDashboardComponent } from './components/administration-dashboard/administration-dashboard.component';
import { AddTransmissionEventTypeComponent } from './components/dictionaries/transmission-event-type/add-transmission-event-type/add-transmission-event-type.component';
import { EditTransmissionEventTypeComponent } from './components/dictionaries/transmission-event-type/edit-transmission-event-type/edit-transmission-event-type.component';
import { TransmissionEventTypesListComponent } from './components/dictionaries/transmission-event-types-list/transmission-event-types-list.component';
import { ChangeUserRoleComponent } from './components/roles/change-user-role/change-user-role.component';
import { UserRolesListComponent } from './components/roles/user-roles-list/user-roles-list.component';

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Empty,
    component: AdministrationComponent,
    children: [
      {
        path: Constants.Routing.BasicPaths.Empty,
        component: AdministrationDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: Constants.Routing.AdministrationPaths.TransmissionEventTypes,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: TransmissionEventTypesListComponent,
            pathMatch: 'full'
          },
          {
            path: Constants.Routing.AdministrationPaths.AddTransmissionEventTypes,
            component: AddTransmissionEventTypeComponent
          },
          {
            path: Constants.Routing.AdministrationPaths.EditTransmissionEventTypes,
            component: EditTransmissionEventTypeComponent
          }
        ]
      },
      {
        path: Constants.Routing.AdministrationPaths.Users,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: UserRolesListComponent,
            pathMatch: 'full'
          },
          {
            path: Constants.Routing.AdministrationPaths.ChangeUserRole,
            component: ChangeUserRoleComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
