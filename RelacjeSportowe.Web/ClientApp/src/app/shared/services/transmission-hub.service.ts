import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AddTransmissionEventRequest, UpdateTransmissionEventRequest } from 'src/app/models/dtos/requests/transmission-event-request';
import { TransmissionEvent } from 'src/app/models/transmission-event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransmissionHubService {

  private hubConnection: HubConnection;
  private isSubscribing: boolean = false;

  public transmissionEventReceived: EventEmitter<TransmissionEvent[]> = new EventEmitter<TransmissionEvent[]>();
  public transmissionEventUpdateReceived: EventEmitter<TransmissionEvent[]> = new EventEmitter<TransmissionEvent[]>();

  constructor() {
    this.buildConnection();
  }

  private buildConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.apiAddress + 'live')
      .build();
  }

  public startConnection(transmissionId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log("connection started");
          this.hubConnection.on("TransmissionEventReceived", this.onTransmissionEventReceived);
          this.hubConnection.on("TransmissionEventUpdateReceived", this.onTransmissionEventUpdateReceived);

          this.subscribeTransmission(transmissionId)
            .then(() => {
              console.log("Transmission subscribed!");
              resolve();
            })
            .catch((error) => {
              console.log("Unable to subscribe transmission: " + error);
              reject(error);
            });

        })
        .catch((error) => {
          console.log("connection error: " + error);
          reject(error);
        });
    })
  }

  public closeConnection(transmissionId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.unsubscribeTransmission(transmissionId)
        .then(() => {
          console.log("Transmission unsubscribed!");
          this.hubConnection
            .stop()
            .then(() => {
              console.log("connection finished");
              this.hubConnection.off("TransmissionEventReceived", this.onTransmissionEventReceived);
              this.hubConnection.off("TransmissionEventUpdateReceived", this.onTransmissionEventUpdateReceived);
              resolve();
            })
            .catch((error) => {
              console.log("connection error: " + error);
              reject(error);
            });
        })
        .catch((error) => {
          console.log("Unable to unsubscribe transmission: " + error);
          reject(error);
        });
    });
  }

  private subscribeTransmission(transmissionId: number): Promise<any> {
    if (this.isSubscribing === false) {
      this.isSubscribing = true;
    } else {
      return new Promise((resolve, reject) => { reject(); });
    }

    return this.hubConnection.invoke("SubscribeTransmission", transmissionId);
  }

  private unsubscribeTransmission(transmissionId: number): Promise<any> {
    if (this.isSubscribing === true) {
      this.isSubscribing = false;
    } else {
      return new Promise((resolve, reject) => { reject(); });
    }

    return this.hubConnection.invoke("UnsubscribeTransmission", transmissionId);
  }

  public sendTransmissionEvent(request: AddTransmissionEventRequest): Promise<any> {
    return this.hubConnection.invoke("BroadcastTransmissionEvent", request);
  }

  public sendTransmissionEventUpdate(request: UpdateTransmissionEventRequest): Promise<any> {
    return this.hubConnection.invoke("BroadcastTransmissionEventUpdate", request);
  }

  private onTransmissionEventReceived = (response: TransmissionEvent) => {
    console.log("RECEIVED TRANSMISSION EVENT: " + response);
    this.transmissionEventReceived.emit([response]);
  }

  private onTransmissionEventUpdateReceived = (response: TransmissionEvent) => {
    console.log("RECEIVED TRANSMISSION EVENT UPDATE: " + response);
    this.transmissionEventUpdateReceived.emit([response]);
  }
}
