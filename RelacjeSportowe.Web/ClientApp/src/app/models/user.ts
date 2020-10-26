export class User {

  public id: number;
  public username: string;
  public ratingPoints: number;
  public readonly isActive: boolean;

  constructor(user: User) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.ratingPoints = user.ratingPoints;
      this.isActive = user.isActive;
    }
  }
}