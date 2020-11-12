export class Transmission {
  public id: number;
  public eventDate: Date;
  public startData: Date;
  public teamHome: string;
  public teamAway: string;
  public username: string;
  public viewersCount: string;

  constructor(data: any) {
    this.eventDate = data.eventDate;
    this.startData = data.startData;
    this.teamHome = data.teamHome;
    this.teamAway = data.teamAway;
    this.username = data.username;
    this.viewersCount = data.viewersCount;
  }
}