import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { UpdateTransmissionEventTypeRequest } from 'src/app/models/dtos/requests/transmission-event-type-request';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionEventTypeBaseComponent } from '../transmission-event-type-base.component';

@Component({
  selector: 'app-edit-transmission-event-type',
  templateUrl: './edit-transmission-event-type.component.html',
  styleUrls: ['./edit-transmission-event-type.component.less']
})
export class EditTransmissionEventTypeComponent extends TransmissionEventTypeBaseComponent implements OnInit {

  @Input() public transmissionEventType: TransmissionEventType;

  constructor(private router: Router,
    private routingStorageService: RoutingStorageService) {
    super();

    if (!!this.routingStorageService.storage === false) {
      this.router.navigate([
        Constants.Routing.BasicPaths.Administration,
        Constants.Routing.AdministrationPaths.TransmissionEventTypes
      ]);
    }

    this.transmissionEventType = this.routingStorageService.storage;
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    const valueControl = new FormControl(this.transmissionEventType.value, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    })

    this.transmissionEventForm.addControl('value', valueControl);
  }

  public submit(): void {
    if (this.transmissionEventForm.valid) {
      const editTransmissionEventRequest = new UpdateTransmissionEventTypeRequest(this.transmissionEventForm.getRawValue());
      editTransmissionEventRequest.id = this.transmissionEventType.id;
    }
  }
}
