import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUserRequest } from 'src/app/models/dtos/requests/login-user-request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  public formSubmissionInProgress: boolean = false;
  public submitted: boolean = false;

  get username() { return this.loginFormGroup.get('username'); }
  get password() { return this.loginFormGroup.get('password'); }

  private redirectUrl: string;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirectUrl'];
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginFormGroup.valid) {
      this.formSubmissionInProgress = true;
      this.userService.login(new LoginUserRequest(this.loginFormGroup.getRawValue()))
        .subscribe((response) => {
          console.log(response);
          this.redirectUrl = this.redirectUrl || "/Home";
          this.router.navigateByUrl(this.redirectUrl);
        }, (error) => {
          console.log(error);
          this.formSubmissionInProgress = false;
        });
    }
  }
}
