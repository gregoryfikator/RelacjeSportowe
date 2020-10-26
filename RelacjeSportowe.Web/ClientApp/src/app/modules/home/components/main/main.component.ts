import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }

  public get isUserLogged() {
    return this.authorizationService.getCurrentUser().value != null;
  }
}
