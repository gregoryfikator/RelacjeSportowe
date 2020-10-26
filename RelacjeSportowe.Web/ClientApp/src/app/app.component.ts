import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  
  title = 'app';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.silentLogin()
      .subscribe();
  }
}
