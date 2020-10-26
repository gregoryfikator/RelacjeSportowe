import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserRequest } from 'src/app/models/dtos/requests/login-user-request';
import { AuthorizationService } from 'src/app/modules/api-authorization/authorization.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public loginFormGroup: FormGroup;

  public formSubmissionInProgress: boolean;

  constructor(private userService: UserService,
    private authorizationService: AuthorizationService,
    private router: Router) {
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
    if (this.loginFormGroup.valid) {
      this.formSubmissionInProgress = true;
      this.userService.login(new LoginUserRequest(this.loginFormGroup.getRawValue()))
        .subscribe((response) => {
          console.log(response);
          this.router.navigateByUrl("/Home");
        }, (error) => {
          console.log(error);
          this.formSubmissionInProgress = false;
        });
    }
  }

  // public logout(): void {
  //   localStorage.clear();
  //   this.authorizationService.setCurrentUser(null);
  //   this.router.navigate(['/']);
  // }
}
