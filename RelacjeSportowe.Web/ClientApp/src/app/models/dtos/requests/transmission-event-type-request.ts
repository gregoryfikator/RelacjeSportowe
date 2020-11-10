abstract class TransmissionEventTypeRequest {
  public value: string;

  constructor(data: any) {
    this.value = data.value;
  }
}

export class AddTransmissionEventTypeRequest extends TransmissionEventTypeRequest {
  constructor(data: any) {
    super(data);
  }
}

export class EditTransmissionEventTypeRequest extends TransmissionEventTypeRequest {
  public id: number;

  constructor(data: any) {
    super(data);

    this.id = data.id;
  }
}