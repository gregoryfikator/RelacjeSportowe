import { Component, OnInit } from '@angular/core';
import { JwtAccessTokenService } from './modules/api-authorization/jwt-access-token.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private userService: UserService,
    private jwtTokenService: JwtAccessTokenService) {
  }

  ngOnInit() {
    if (this.jwtTokenService.getToken() != null) {
      this.userService.silentLogin()
        .subscribe();
    }
  }
}
