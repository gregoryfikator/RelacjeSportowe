abstract class TransmissionEventRequest {
  public transmissionId: number;
  public transmissionEventTypeId: number;
  public description: string;
  public timeInfo: string;

  constructor(data: any) {
    this.transmissionId = data.transmissionId;
    this.transmissionEventTypeId = data.transmissionEventTypeId;
    this.description = data.description;
    this.timeInfo = data.timeInfo;
  }
}

export class AddTransmissionEventRequest extends TransmissionEventRequest {
  constructor(data: any) {
    super(data);
  }
}

export class UpdateTransmissionEventRequest extends TransmissionEventRequest {
  public id: number;

  constructor(data: any) {
    super(data);
    this.id = data.id;
  }
}