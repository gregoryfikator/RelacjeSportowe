import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { AddTransmissionEventTypeRequest } from 'src/app/models/dtos/requests/transmission-event-type-request';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';
import { TransmissionService } from 'src/app/shared/services/transmission.service';
import { TransmissionEventTypeBaseComponent } from '../transmission-event-type-base.component';

@Component({
  selector: 'app-add-transmission-event-type',
  templateUrl: './add-transmission-event-type.component.html',
  styleUrls: ['./add-transmission-event-type.component.less']
})
export class AddTransmissionEventTypeComponent extends TransmissionEventTypeBaseComponent implements OnInit {

  constructor(private transmissionService: TransmissionService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    const valueControl = new FormControl(null, {
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

  public onSubmit(): void {
    if (this.transmissionEventForm.valid) {
      const addTransmissionEventRequest = new AddTransmissionEventTypeRequest(this.transmissionEventForm.getRawValue());
      this.transmissionService.addTransmissionEventType(addTransmissionEventRequest)
        .subscribe((result: any) => {
          console.log(result);
          this.router.navigate([
            Constants.Routing.BasicPaths.Administration,
            Constants.Routing.AdministrationPaths.TransmissionEventTypes
          ]);
        });
    }
  }
}