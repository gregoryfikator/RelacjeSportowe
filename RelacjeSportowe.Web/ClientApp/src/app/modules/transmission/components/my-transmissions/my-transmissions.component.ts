import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-my-transmissions',
  templateUrl: './my-transmissions.component.html',
  styleUrls: ['./my-transmissions.component.less']
})
export class MyTransmissionsComponent implements OnInit {
  public transmissions$: Observable<Transmission[]> = new Observable<Transmission[]>();

  constructor(private transmissionService: TransmissionService,
    private router: Router,
    private routingStorageService: RoutingStorageService) {

    this.transmissions$ = this.transmissionService.getMyTransmissions();
   }

   ngOnInit() {
  }

   public updateTransmission(transmission: Transmission) {
    this.routingStorageService.storage = transmission;
    this.router.navigate([
      Constants.Routing.BasicPaths.Transmission,
      Constants.Routing.TransmissionPaths.EditTransmission
    ]);
   }

   public viewTransmission(transmission: Transmission) {
    this.routingStorageService.storage = transmission;
    this.router.navigate([
      Constants.Routing.BasicPaths.Transmission,
      Constants.Routing.TransmissionPaths.Live
    ]);
   }
}
