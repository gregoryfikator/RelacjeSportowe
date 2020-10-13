import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "src/app/app.constants";
import { TransmissionComponent } from "./components/transmission/transmission.component";

const routes: Routes = [
  {
    path: Constants.Routing.BasicPaths.Transmission,
    component: TransmissionComponent,
    children: [
      {
        path: Constants.Routing.TransmissionPaths.AllTransmissions,
        pathMatch: 'full'
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
export class AppRoutingModule { }