export class TransmissionEvent {
  public id: number;
  public description: string;
  public timeInfo: string;
  public transmissionEventType: string;
  public transmissionEventTypeId: number;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.timeInfo = data.timeInfo;
    this.transmissionEventType = data.transmissionEventType;
    this.transmissionEventTypeId = data.transmissionEventTypeId;
  }
}