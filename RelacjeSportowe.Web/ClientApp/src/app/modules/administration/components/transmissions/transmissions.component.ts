import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { DeleteTransmissionRequest } from 'src/app/models/dtos/requests/transmission-request';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-transmissions',
  templateUrl: './transmissions.component.html',
  styleUrls: ['./transmissions.component.less']
})
export class TransmissionsComponent implements OnInit {

  public transmissions$: Observable<Transmission[]> = new Observable<Transmission[]>();
  constructor(private transmissionService: TransmissionService,
    private routingStorageService: RoutingStorageService,
    private router: Router) {

    this.transmissions$ = this.transmissionService.getAllTransmissions();
  }

  ngOnInit() {
  }

  public deleteTransmission(transmission: Transmission) {
    this.transmissionService.deleteTransmission(new DeleteTransmissionRequest(transmission))
      .subscribe(() => {
        this.transmissions$ = this.transmissionService.getAllTransmissions();
      });
  }

  public watchTransmission(transmission: Transmission) {
    this.routingStorageService.storage = transmission;
    this.router.navigate([
      Constants.Routing.BasicPaths.Transmission,
      Constants.Routing.TransmissionPaths.Live
    ]);
  }
}
