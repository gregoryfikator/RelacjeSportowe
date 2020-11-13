import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { AddTransmissionEventRequest } from 'src/app/models/dtos/requests/transmission-event-request';
import { Transmission } from 'src/app/models/transmission';
import { TransmissionEventType } from 'src/app/models/transmission-event-type';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionHubService } from 'src/app/shared/services/transmission-hub.service';
import { TransmissionService } from 'src/app/shared/services/transmission.service';

@Component({
  selector: 'app-live-transmission-caster-panel',
  templateUrl: './live-transmission-caster-panel.component.html',
  styleUrls: ['./live-transmission-caster-panel.component.less']
})
export class LiveTransmissionCasterPanelComponent implements OnInit {

  @ViewChild("photoToSend", { static: true }) photoToSend: ElementRef;
  @ViewChild('photoInput', { static: true }) photoInput: ElementRef;

  public addTransmissionEventForm: FormGroup = new FormGroup({});

  public transmissionEventTypes$: Observable<TransmissionEventType[]> = new Observable<TransmissionEventType[]>();

  private transmissionEventTypes: TransmissionEventType[];

  private _transmission: Transmission;

  public get transmission(): Transmission {
    return this._transmission;
  }

  @Input() public set transmission(value: Transmission) {
    this._transmission = value;
  }

  private _hasPhoto: boolean = false;

  public get hasPhoto(): boolean {
    return this._hasPhoto;
  }

  @Input() public set hasPhoto(value: boolean) {
    this._hasPhoto = value;
  }

  public get timeInfo() {
    return this.addTransmissionEventForm.get('timeInfo');
  }

  public get description() {
    return this.addTransmissionEventForm.get('description');
  }

  public get transmissionEventTypeId() {
    return this.addTransmissionEventForm.get('transmissionEventTypeId');
  }

  constructor(private transmissionService: TransmissionService,
    private transmissionHubService: TransmissionHubService,
    private routingStorageService: RoutingStorageService,
    private router: Router) {

    this.transmissionEventTypes$ = this.transmissionService.getTransmissionEventTypes()
      .pipe(
        tap(x => this.transmissionEventTypes = x)
      );
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    const timeInfoControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const descriptionControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    const transmissionEventTypeIdControl = new FormControl(null, {
      updateOn: "change",
      validators: [
        Validators.required
      ],
      asyncValidators: [

      ]
    });

    this.addTransmissionEventForm.addControl('timeInfo', timeInfoControl);
    this.addTransmissionEventForm.addControl('description', descriptionControl);
    this.addTransmissionEventForm.addControl('transmissionEventTypeId', transmissionEventTypeIdControl);
    this.addTransmissionEventForm.reset();
  }

  public endTransmission(): void {
    this.transmissionService.endTransmission(this.transmission.id)
      .subscribe(() => {
        this.routingStorageService.storage = null;

        this.router.navigate([
          Constants.Routing.BasicPaths.Transmission,
          Constants.Routing.TransmissionPaths.MyTransmissions
        ]);
      });
  }

  public onSubmit(): void {
    if (this.addTransmissionEventForm.valid) {
      const addTransmissionEventRequest = new AddTransmissionEventRequest(this.addTransmissionEventForm.getRawValue());
      addTransmissionEventRequest.transmissionId = this.routingStorageService.storage.id;
      this.transmissionHubService.sendTransmissionEvent(addTransmissionEventRequest)
        .then(() => {
          this.addTransmissionEventForm.reset();
        }, (error) => {

        });
    }
  }

  public addEventWithPhoto() {
    const addTransmissionEventRequest = new AddTransmissionEventRequest({
      transmissionId: this.routingStorageService.storage.id,
      transmissionEventTypeId: 22,
      description: this.photoToSend.nativeElement.src,
      timeInfo: ''
    });
    this.transmissionHubService.sendTransmissionEvent(addTransmissionEventRequest)
      .then(() => {

      }, (error) => {

      });
  }

  public togglePhotoInput() {
    this.photoInput.nativeElement.click();
  }

  public handlePhotoInput(files: FileList) {
    const file = files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photoToSend.nativeElement.src = reader.result;
      this.hasPhoto = true;
    };
  }
}
