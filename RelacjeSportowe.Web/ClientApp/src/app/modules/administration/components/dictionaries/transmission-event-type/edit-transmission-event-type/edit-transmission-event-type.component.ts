import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EditTransmissionEventTypeRequest } from 'src/app/models/dtos/requests/transmission-event-type-request';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';
import { TransmissionEventTypeBaseComponent } from '../transmission-event-type-base.component';

@Component({
  selector: 'app-edit-transmission-event-type',
  templateUrl: './edit-transmission-event-type.component.html',
  styleUrls: ['./edit-transmission-event-type.component.less']
})
export class EditTransmissionEventTypeComponent extends TransmissionEventTypeBaseComponent implements OnInit {

  @Input() public transmissionEventType: TransmissionEventType;

  constructor() {
    super();
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
    this.transmissionEventForm.reset();
  }

  public submit(): void {
    if (this.transmissionEventForm.valid) {
      const editTransmissionEventRequest = new EditTransmissionEventTypeRequest(this.transmissionEventForm.getRawValue());
      editTransmissionEventRequest.id = this.transmissionEventType.id;
    }
  }
}
