import { User } from "./user";

export class UserWithRole extends User {
  public readonly role: string;
  public readonly roleId: number;

  constructor(userWithRole: any) {
    super(userWithRole);

    this.role = userWithRole.role;
    this.roleId = userWithRole.roleId;
  }
}