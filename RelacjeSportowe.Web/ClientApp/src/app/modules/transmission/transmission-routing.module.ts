import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "src/app/app.constants";
import { AddTransmissionComponent } from "./components/add-transmission/add-transmission.component";
import { AllTransmissionsComponent } from "./components/all-transmissions/all-transmissions.component";
import { EditTransmissionComponent } from "./components/edit-transmission/edit-transmission.component";
import { LiveTransmissionComponent } from "./components/live-transmission/live-transmission.component";
import { MyTransmissionsComponent } from "./components/my-transmissions/my-transmissions.component";
import { TransmissionDashboardComponent } from "./components/transmission-dashboard/transmission-dashboard.component";
import { TransmissionComponent } from "./transmission.component";

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Empty,
    component: TransmissionComponent,
    children: [
      {
        path: Constants.Routing.BasicPaths.Empty,
        component: TransmissionDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: Constants.Routing.TransmissionPaths.AllTransmissions,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: AllTransmissionsComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: Constants.Routing.TransmissionPaths.AddTransmission,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: AddTransmissionComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: Constants.Routing.TransmissionPaths.EditTransmission,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: EditTransmissionComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: Constants.Routing.TransmissionPaths.Live,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: LiveTransmissionComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: Constants.Routing.TransmissionPaths.MyTransmissions,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: MyTransmissionsComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: Constants.Routing.TransmissionPaths.AllTransmissions,
        children: [
          {
            path: Constants.Routing.BasicPaths.Empty,
            component: AllTransmissionsComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class TransmissionRoutingModule { }