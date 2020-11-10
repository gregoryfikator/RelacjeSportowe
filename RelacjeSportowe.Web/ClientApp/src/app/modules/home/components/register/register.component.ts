import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/models/dtos/requests/register-user-request';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatchValidator } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  public registerFormGroup: FormGroup;

  public formSubmissionInProgress: boolean = false;
  public submitted: boolean = false;

  get email() { return this.registerFormGroup.get('email'); }
  get username() { return this.registerFormGroup.get('username'); }
  get passwordGroup() { return this.registerFormGroup.get('passwordGroup'); }
  get password() { return this.passwordGroup.get('password'); }
  get passwordConfirm() { return this.passwordGroup.get('passwordConfirm'); }

  constructor(private userService: UserService,
    private router: Router) {

    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      passwordGroup: new FormGroup({
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
        ])
      }, [
        MustMatchValidator('password', 'passwordConfirm')
      ])
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerFormGroup.valid) {
      this.formSubmissionInProgress = true;

      const registerUserRequest = new RegisterUserRequest(this.registerFormGroup.getRawValue());
      registerUserRequest.password = this.password.value;

      this.userService.register(new RegisterUserRequest(registerUserRequest))
        .subscribe((response) => {
          console.log(response);
          this.router.navigateByUrl("/Home");
        }, (error) => {
          console.log(error);
          this.formSubmissionInProgress = false;
        });
    }
  }
}
