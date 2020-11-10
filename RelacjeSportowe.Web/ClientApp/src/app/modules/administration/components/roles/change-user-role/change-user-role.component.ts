import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-user-role',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.less']
})
export class ChangeUserRoleComponent implements OnInit {

  constructor(private userService: UserService,
    private roleService: RolesService) {
  }

  ngOnInit() {
  }

}
