import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AddTransmissionEventRequest, UpdateTransmissionEventRequest } from 'src/app/models/dtos/requests/transmission-event-request';
import { TransmissionEvent } from 'src/app/models/transmission-event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransmissionHubService {

  private hubConnection: HubConnection;

  constructor() {
    this.buildConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.apiAddress + 'live')
      .build();
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log("connection started");
        this.hubConnection.on("TransmissionEventReceived", this.onTransmissionEventReceived);
        this.hubConnection.on("TransmissionEventUpdateReceived", this.onTransmissionEventUpdateReceived);
      })
      .catch((error) => {
        console.log("connection error: " + error);
      });
  }

  public closeConnection() {
    this.hubConnection
      .stop()
      .then(() => {
        console.log("connection finished");
        this.hubConnection.off("TransmissionEventReceived", this.onTransmissionEventReceived);
        this.hubConnection.off("TransmissionEventUpdateReceived", this.onTransmissionEventUpdateReceived);
      })
      .catch((error) => {
        console.log("connection error: " + error);
      });
  }

  public subscribeTransmission(transmissionId: number) {
    this.hubConnection.invoke("SubscribeTransmission", transmissionId)
      .then(() => {
        console.log("Transmission subscribed!");
      })
      .catch((error) => {
        console.log("Unable to subscribe transmission: " + error);
      });
  }

  public unsubscribeTransmission(transmissionId: number) {
    this.hubConnection.invoke("UnsubscribeTransmission", transmissionId)
      .then(() => {
        console.log("Transmission unsubscribed!");
      })
      .catch((error) => {
        console.log("Unable to unsubscribe transmission: " + error);
      });
  }

  public sendTransmissionEvent(request: AddTransmissionEventRequest) {
    this.hubConnection.invoke("BroadcastTransmissionEvent", request)
      .then(() => {
        console.log("Transmission Event successfully broadcasted!");
      })
      .catch((error) => {
        console.log("Unable to send Transmission Event: " + error);
      });
  }

  public sendTransmissionEventUpdate(request: UpdateTransmissionEventRequest) {
    this.hubConnection.invoke("BroadcastTransmissionEventUpdate", request)
      .then(() => {
        console.log("Transmission Event Update successfully broadcasted!");
      })
      .catch((error) => {
        console.log("Unable to send Transmission Event Update: " + error);
      });
  }

  private onTransmissionEventReceived(response: TransmissionEvent) {
    console.log("RECEIVED TRANSMISSION EVENT: " + response);
  }

  private onTransmissionEventUpdateReceived(response: TransmissionEvent) {
    console.log("RECEIVED TRANSMISSION EVENT: " + response);
  }
}
