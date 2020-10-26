import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Component({
  selector: 'app-top-navigation-menu',
  templateUrl: './top-navigation-menu.component.html',
  styleUrls: ['./top-navigation-menu.component.less']
})
export class TopNavigationMenuComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) {
  }
  
  ngOnInit() {
  }

  public get isUserLogged() {
    return this.authorizationService.getCurrentUser().value != null;
  }
}
