import { Component, OnInit } from '@angular/core';
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

  public sendTestMessage() {
    this.transmissionHubService.sendTestMessage();
  }

  public sendTransmissionEvent() {
    this.transmissionHubService.sendTransmissionEvent();
  }

  public addToGroup() {
    this.transmissionHubService.addToGroup();
  }

  public removeFromGroup() {
    this.transmissionHubService.removeFromGroup();
  }

  public closeConnection() {
    this.transmissionHubService.closeConnection();
  }
}
