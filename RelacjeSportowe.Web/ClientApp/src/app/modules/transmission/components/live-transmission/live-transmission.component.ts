import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/app.constants';
import { Transmission } from 'src/app/models/transmission';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { TransmissionHubService } from 'src/app/shared/services/transmission-hub.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-live-transmission',
  templateUrl: './live-transmission.component.html',
  styleUrls: ['./live-transmission.component.less']
})
export class LiveTransmissionComponent implements OnInit, OnDestroy {

  @Input() public transmission: Transmission;

  private _isConnected: boolean = false;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  public get isOwner(): boolean {
    return this.transmission ? this.userService.getCurrentUser().value.username === this.transmission.username : false;
  }

  constructor(private transmissionHubService: TransmissionHubService,
    private userService: UserService,
    private routingStorageService: RoutingStorageService,
    private router: Router,
    private spinner: NgxSpinnerService) {

    this.spinner.show();

    this.transmission = this.routingStorageService.storage;

    if (!!this.transmission === false) {
      this.router.navigate([
        Constants.Routing.BasicPaths.Transmission,
        Constants.Routing.TransmissionPaths.AllTransmissions
      ]);
    }
  }

  ngOnInit() {
    if (this.transmission) {
      this.transmissionHubService.startConnection(this.transmission.id)
        .then(() => {
          this._isConnected = true;
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
        });
    }
  }

  ngOnDestroy() {
    if (this.transmission) {
      this.spinner.show();
      this.transmissionHubService.closeConnection(this.transmission.id)
        .then(() => {
          this.spinner.hide();
        }, (error) => {
          this.spinner.hide();
        });
    }
  }
}
