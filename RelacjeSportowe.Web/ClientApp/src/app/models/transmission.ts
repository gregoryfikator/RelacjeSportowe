export class Transmission {
  public id: number;
  public endDate: Date;
  public eventDate: Date;
  public startDate: Date;
  public teamHome: string;
  public teamAway: string;
  public username: string;
  public viewersCount: string;

  constructor(data: any) {
    this.endDate = data.endDate;
    this.eventDate = data.eventDate;
    this.startDate = data.startDate;
    this.teamHome = data.teamHome;
    this.teamAway = data.teamAway;
    this.username = data.username;
    this.viewersCount = data.viewersCount;
  }
}