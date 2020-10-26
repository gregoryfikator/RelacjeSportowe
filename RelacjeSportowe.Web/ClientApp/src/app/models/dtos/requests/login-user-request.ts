export class LoginUserRequest {
  public username: string;
  public password: string;

  constructor(loginUserRequest: any) {
    this.username = loginUserRequest.username;
    this.password = loginUserRequest.password;
  }
}