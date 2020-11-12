import { Component, OnInit } from '@angular/core';
import { AddTransmissionEventRequest, UpdateTransmissionEventRequest } from 'src/app/models/dtos/requests/transmission-event-request';
import { TransmissionHubService } from 'src/app/shared/services/transmission-hub.service';

@Component({
  selector: 'app-transmission-dashboard',
  templateUrl: './transmission-dashboard.component.html',
  styleUrls: ['./transmission-dashboard.component.less']
})
export class TransmissionDashboardComponent implements OnInit {

  constructor(private transmissionHubService: TransmissionHubService) { }

  ngOnInit() {
  }

  public startConnection() {
    this.transmissionHubService.startConnection();
  }

  public sendTransmissionEvent() {
    const transmissionEvent = new AddTransmissionEventRequest({});
    this.transmissionHubService.sendTransmissionEvent(transmissionEvent);
  }

  public sendTransmissionEventUpdate() {
    const transmissionEvent = new UpdateTransmissionEventRequest({});
    this.transmissionHubService.sendTransmissionEvent(transmissionEvent);
  }

  public addToGroup() {
    this.transmissionHubService.subscribeTransmission(0);
  }

  public removeFromGroup() {
    this.transmissionHubService.unsubscribeTransmission(0);
  }

  public closeConnection() {
    this.transmissionHubService.closeConnection();
  }
}
