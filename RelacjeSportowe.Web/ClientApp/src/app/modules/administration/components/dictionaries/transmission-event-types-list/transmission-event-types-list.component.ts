import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-transmission-event-types-list',
  templateUrl: './transmission-event-types-list.component.html',
  styleUrls: ['./transmission-event-types-list.component.less']
})
export class TransmissionEventTypesListComponent implements OnInit {

  public transmissionEventTypes$: Observable<TransmissionEventType[]> = new Observable<TransmissionEventType[]>();

  constructor(private transmissionService: TransmissionService,
    private router: Router,
    private route: ActivatedRoute) {
    this.transmissionEventTypes$ = this.transmissionService.getTransmissionEventTypes();
  }

  ngOnInit() {
  }

  public addEventType(): void {
    this.router.navigate([Constants.Routing.AdministrationPaths.AddTransmissionEventTypes], {
      relativeTo: this.route
    });
  }

  public editEventType(eventType: TransmissionEventType): void {
    this.router.navigate([Constants.Routing.AdministrationPaths.EditTransmissionEventTypes], {
      queryParams: eventType,
      relativeTo: this.route
    });
  }
}
