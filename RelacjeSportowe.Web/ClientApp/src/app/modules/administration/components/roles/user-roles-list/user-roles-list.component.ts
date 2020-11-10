import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { UserWithRole } from 'src/app/models/user-with-role';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-roles-list',
  templateUrl: './user-roles-list.component.html',
  styleUrls: ['./user-roles-list.component.less']
})
export class UserRolesListComponent implements OnInit {

  public users$: Observable<UserWithRole[]> = new Observable<UserWithRole[]>();

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
      this.users$ = this.userService.getUsers();
    }

  ngOnInit() {
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe((result) => {
        this.users$ = this.userService.getUsers();
        console.log('Deleted: ' + result);
      });
  }

  public editUserRole(user: UserWithRole): void {
    this.router.navigate([Constants.Routing.AdministrationPaths.ChangeUserRole], {
      queryParams: { userId: user.id, currentRoleId: user.roleId },
      relativeTo: this.route
    });
  }
  
  public lockUserAccount(userId: number): void {
    this.userService.lockUserAccount(userId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  public unlockUserAccount(userId: number): void {
    this.userService.unlockUserAccount(userId)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
