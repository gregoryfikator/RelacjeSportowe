import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { AdministrationComponent } from './administration.component';
import { AdministrationDashboardComponent } from './components/administration-dashboard/administration-dashboard.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
