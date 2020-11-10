export class UpdateUserRoleRequest {
  public userId: number;
  public roleId: number;

  constructor(data: any) {
    this.userId = data.userId;
    this.roleId = data.roleId;
  }
}