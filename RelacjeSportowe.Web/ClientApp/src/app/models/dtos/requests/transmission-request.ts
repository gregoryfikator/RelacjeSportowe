abstract class TransmissionRequest {
  public teamHome: string;
  public teamAway: string;
  public eventDate: Date;

  constructor(data: any) {
    this.teamHome = data.teamHome;
    this.teamAway = data.teamAway;

    if (data.eventDate && data.eventTime) {
      this.eventDate = new Date(`${data.eventDate}T${data.eventTime}:00`);
    } else {
      this.eventDate = data.eventDate;
    }
  }
}

export class AddTransmissionRequest extends TransmissionRequest {
  constructor(data: any) {
    super(data);
  }
}

export class DeleteTransmissionRequest {
  public id: number;

  constructor(data: any) {
    this.id = data.id;
  }
}

export class EndTransmissionRequest {
  public id: number;

  constructor(data: any) {
    this.id = data.id;
  }
}

export class UpdateTransmissionRequest extends TransmissionRequest {
  public id: number;

  constructor(data: any) {
    super(data);
    this.id = data.id;
  }
}

export class VoteTransmissionRequest {
  public id: number;
  public rating: number;

  constructor(data: any) {
    this.id = data.id;
    this.rating = data.rating;
  }
}