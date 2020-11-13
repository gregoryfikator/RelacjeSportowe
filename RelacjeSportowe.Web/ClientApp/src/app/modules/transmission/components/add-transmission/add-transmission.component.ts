import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { AddTransmissionRequest } from 'src/app/models/dtos/requests/transmission-request';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-add-transmission',
  templateUrl: './add-transmission.component.html',
  styleUrls: ['./add-transmission.component.less']
})
export class AddTransmissionComponent implements OnInit {

  public addTransmissionForm: FormGroup = new FormGroup({});
  public submitted: boolean = false;

  public get teamHome() {
    return this.addTransmissionForm.get('teamHome');
  }

  public get teamAway() {
    return this.addTransmissionForm.get('teamAway');
  }

  public get eventDate() {
    return this.addTransmissionForm.get('eventDate');
  }

  public get eventTime() {
    return this.addTransmissionForm.get('eventTime');
  }

  constructor(private transmissionService: TransmissionService,
    private routingStorageService: RoutingStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    const teamHomeControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const teamAwayControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const eventDateControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const eventTimeControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    this.addTransmissionForm.addControl('teamHome', teamHomeControl);
    this.addTransmissionForm.addControl('teamAway', teamAwayControl);
    this.addTransmissionForm.addControl('eventDate', eventDateControl);
    this.addTransmissionForm.addControl('eventTime', eventTimeControl);
    this.addTransmissionForm.reset();
  }

  public onSubmit(): void {
    this.submitted = true;
    
    if (this.addTransmissionForm.valid) {
      const addTransmissionEventRequest = new AddTransmissionRequest(this.addTransmissionForm.getRawValue());
      this.transmissionService.addTransmission(addTransmissionEventRequest)
        .subscribe((transmission: Transmission) => {
          this.routingStorageService.storage = transmission;
          this.router.navigate([
            Constants.Routing.BasicPaths.Transmission,
            Constants.Routing.TransmissionPaths.Live
          ]);
        });
    }
  }
}
