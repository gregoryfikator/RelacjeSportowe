export class RegisterUserRequest {
  public email: string;
  public username: string;
  public password: string;

  constructor(registerUserRequest: any) {
    this.email = registerUserRequest.email;
    this.username = registerUserRequest.username;
    this.password = registerUserRequest.password;
  }
}