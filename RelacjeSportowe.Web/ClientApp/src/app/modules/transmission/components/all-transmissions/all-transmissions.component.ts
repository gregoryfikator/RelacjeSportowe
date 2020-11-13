import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-all-transmissions',
  templateUrl: './all-transmissions.component.html',
  styleUrls: ['./all-transmissions.component.less']
})
export class AllTransmissionsComponent implements OnInit {
  public transmissions$: Observable<Transmission[]> = new Observable<Transmission[]>();
  constructor(private transmissionService: TransmissionService,
    private routingStorageService: RoutingStorageService,
    private router: Router) {

    this.transmissions$ = this.transmissionService.getAllTransmissions();
  }

  ngOnInit() {
  }

  public watchTransmission(transmission: Transmission) {
    this.routingStorageService.storage = transmission;
    this.router.navigate([
      Constants.Routing.BasicPaths.Transmission,
      Constants.Routing.TransmissionPaths.Live
    ]);
  }
}
