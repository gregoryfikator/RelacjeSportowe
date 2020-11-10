import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Constants } from 'src/app/app.constants';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Component({
  selector: 'app-user-info-menu-item',
  templateUrl: './user-info-menu-item.component.html',
  styleUrls: ['./user-info-menu-item.component.less']
})
export class UserInfoMenuItemComponent implements OnInit {

  public faUser: IconDefinition = faUser;

  public get username() {
    return this.authorizationService.getCurrentUser().value.username;
  }

  constructor(private router: Router,
    private authorizationService: AuthorizationService) {
    }

  ngOnInit() {
  }

  public logout(): void {
    this.authorizationService.logoutUser();
    this.router.navigateByUrl(Constants.Routing.BasicPaths.Home);
  }
}
