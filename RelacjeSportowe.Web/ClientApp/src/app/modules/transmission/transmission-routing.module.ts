import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "src/app/app.constants";
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