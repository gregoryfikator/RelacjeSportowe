export class User {

  public id: number;
  public email: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public ratingPoints: number;

  constructor(user: User) {
    if (user) {
      this.id = user.id;
      this.email = user.email;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.ratingPoints = user.ratingPoints;
    }
  }
}