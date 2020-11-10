export class UserStanding {
  public userId: number;
  public username: string;
  public position: string;
  public ratingPoints: number;
  public isTransmitting: boolean;

  constructor(userStanding: any) {
    this.userId = userStanding.userId;
    this.username = userStanding.username;
    this.position = userStanding.position.toString();
    this.ratingPoints = userStanding.ratingPoints;
    this.isTransmitting = userStanding.isTransmitting;
  }
}