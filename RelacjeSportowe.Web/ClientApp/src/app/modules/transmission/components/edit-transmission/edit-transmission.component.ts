import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { UpdateTransmissionRequest } from 'src/app/models/dtos/requests/transmission-request';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-edit-transmission',
  templateUrl: './edit-transmission.component.html',
  styleUrls: ['./edit-transmission.component.less']
})
export class EditTransmissionComponent implements OnInit {

  public editTransmissionForm: FormGroup = new FormGroup({});

  private transmissionToEdit: Transmission;

  public get teamHome() {
    return this.editTransmissionForm.get('teamHome');
  }

  public get teamAway() {
    return this.editTransmissionForm.get('teamAway');
  }

  public get eventDate() {
    return this.editTransmissionForm.get('eventDate');
  }

  public get eventTime() {
    return this.editTransmissionForm.get('eventTime');
  }

  constructor(private transmissionService: TransmissionService,
    private routingStorageService: RoutingStorageService,
    private router: Router,
    private datePipe: DatePipe) {
    this.transmissionToEdit = this.routingStorageService.storage;

    if (!!this.transmissionToEdit === false) {
      this.router.navigate([
        Constants.Routing.BasicPaths.Transmission,
        Constants.Routing.TransmissionPaths.MyTransmissions
      ]);
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    const teamHomeControl = new FormControl(this.transmissionToEdit.teamHome, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const teamAwayControl = new FormControl(this.transmissionToEdit.teamAway, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const eventDateControl = new FormControl(this.datePipe.transform(this.transmissionToEdit.eventDate, "yyyy-MM-dd"), {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const eventTimeControl = new FormControl(this.datePipe.transform(this.transmissionToEdit.eventDate, "HH:mm"), {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    this.editTransmissionForm.addControl('teamHome', teamHomeControl);
    this.editTransmissionForm.addControl('teamAway', teamAwayControl);
    this.editTransmissionForm.addControl('eventDate', eventDateControl);
    this.editTransmissionForm.addControl('eventTime', eventTimeControl);
  }

  public onSubmit(): void {
    if (this.editTransmissionForm.valid) {
      const editTransmissionRequest = new UpdateTransmissionRequest(this.editTransmissionForm.getRawValue());
      editTransmissionRequest.id = this.transmissionToEdit.id;
      this.transmissionService.editTransmission(editTransmissionRequest)
        .subscribe((result: any) => {
          console.log(result);
          this.router.navigate([
            Constants.Routing.BasicPaths.Transmission,
            Constants.Routing.TransmissionPaths.MyTransmissions
          ]);
        });
    }
  }
}
