import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
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

        this.hubConnection.on("TestModelReceived",
          (response) => {
            console.log("RECEIVED MESSAGE: " + response);
          });

        this.hubConnection.on("TransmissionEventReceived",
          (response) => {
            console.log("RECEIVED TRANSMISSION EVENT: " + response);
          });
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

        this.hubConnection.off("TestModelReceived",
          (response) => {
            console.log("RECEIVED MESSAGE: " + response);
          });

        this.hubConnection.off("TransmissionEventReceived",
          (response) => {
            console.log("RECEIVED TRANSMISSION EVENT: " + response);
          });
      })
      .catch((error) => {
        console.log("connection error: " + error);
      });
  }

  public addToGroup() {
    this.hubConnection.invoke("AddToGroup", "testGroup")
      .then(() => {
        console.log("Added to testGroup");
      })
      .catch((error) => {
        console.log("Unable to add to group: " + error);
      });
  }

  public removeFromGroup() {
    this.hubConnection.invoke("RemoveFromGroup", "testGroup")
      .then(() => {
        console.log("Removed from testGroup");
      })
      .catch((error) => {
        console.log("Unable to remove from group: " + error);
      });
  }

  public sendTestMessage() {
    this.hubConnection.invoke("BroadcastTestModel", { message: "wiadomość testowa" })
      .then(() => {
        console.log("Test message successfully broadcasted!");
      })
      .catch((error) => {
        console.log("Unable to send test message: " + error);
      });
  }

  public sendTransmissionEvent() {
    this.hubConnection.invoke("BroadcastTransmissionEvent", "testGroup")
      .then(() => {
        console.log("Transmission Event successfully broadcasted!");
      })
      .catch((error) => {
        console.log("Unable to send Transmission Event: " + error);
      });
  }
}
