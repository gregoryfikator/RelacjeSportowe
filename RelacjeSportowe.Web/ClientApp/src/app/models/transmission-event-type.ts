export class TransmissionEventType {
  public id: number;
  public value: string;

  constructor(data: any) {
    this.id = data.id;
    this.value = data.value;
  }
}