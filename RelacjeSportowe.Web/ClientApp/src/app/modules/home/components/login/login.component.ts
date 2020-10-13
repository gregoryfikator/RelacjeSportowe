import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public loginFormGroup: FormGroup;

  constructor(private userService: UserService) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  public onSubmit(): void {
    console.log(this.loginFormGroup.getRawValue())

    if (this.loginFormGroup.valid) {
      this.userService.login(Object.assign({ identityProvider: 0 }, this.loginFormGroup.getRawValue()))
        .subscribe((response) => {
          console.log(response);
        });
    } else {

    }
  }

  public register(): void {
    this.userService.register()
      .subscribe((response) => {
        console.log(response);
      });
  }

}
