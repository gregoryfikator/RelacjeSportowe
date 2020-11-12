import { Transmission } from "./transmission";
import { TransmissionEvent } from "./transmission-event";

export class TransmissionDetails extends Transmission {

  public endDate: Date;
  public userId: number;
  public ratingPoints: number;
  public isTransmitting: boolean;
  public transmissionEvents: TransmissionEvent[];

  constructor(data: any) {
    super(data);
    this.endDate = data.endDate;
    this.userId = data.userId;
    this.ratingPoints = data.ratingPoints;
    this.isTransmitting = data.isTransmitting;
    this.transmissionEvents = data.transmissionEvents;
  }
}