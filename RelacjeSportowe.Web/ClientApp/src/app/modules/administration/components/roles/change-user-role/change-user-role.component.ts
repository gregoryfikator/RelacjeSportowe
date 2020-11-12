import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { UpdateUserRoleRequest } from 'src/app/models/dtos/requests/update-user-role-request';
import { Role } from 'src/app/models/role';
import { UserWithRole } from 'src/app/models/user-with-role';
import { RolesService } from 'src/app/shared/services/roles.service';
import { RoutingStorageService } from 'src/app/shared/services/routing-storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-user-role',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.less']
})
export class ChangeUserRoleComponent implements OnInit, OnDestroy {

  public changeUserRoleForm: FormGroup = new FormGroup({});

  public get roleId() {
    return this.changeUserRoleForm.get('roleId');
  }

  @Input() public user: UserWithRole;

  public roles$: Observable<Role[]> = new Observable<Role[]>();

  constructor(private userService: UserService,
    private roleService: RolesService,
    private router: Router,
    private route: ActivatedRoute,
    private routingStorageService: RoutingStorageService) {
      this.user = this.routingStorageService.storage;

      if (!!this.user === false) {
        this.router.navigate([Constants.Routing.AdministrationPaths.Users], {
          relativeTo: this.route.parent.parent
        });
      }

      this.roles$ = this.roleService.getAll();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.routingStorageService.storage = null;
  }

  public onSubmit(): void {
    if (this.changeUserRoleForm.valid) {
      const updateUserRoleRequest = new UpdateUserRoleRequest(this.changeUserRoleForm.getRawValue());
      updateUserRoleRequest.userId = this.user.id;

      this.userService.updateUserRole(updateUserRoleRequest)
        .subscribe((result: any) => {
          console.log(result);
          this.router.navigate([
            Constants.Routing.BasicPaths.Administration,
            Constants.Routing.AdministrationPaths.Users
          ]);
        });
    }
  }

  private buildForm(): void {
    const roleIdControl = new FormControl(this.user.roleId, {
      updateOn: "change"
    });

    this.changeUserRoleForm.addControl('roleId', roleIdControl);
  }
}
