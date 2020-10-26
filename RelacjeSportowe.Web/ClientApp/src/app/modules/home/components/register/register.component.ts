import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/models/dtos/requests/register-user-request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  public registerFormGroup: FormGroup;

  public formSubmissionInProgress: boolean;

  constructor(private userService: UserService,
    private router: Router) {

    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required
      ])
    });
  }

  public onSubmit(): void {
    if (this.registerFormGroup.valid) {
      this.formSubmissionInProgress = true;
      this.userService.register(new RegisterUserRequest(this.registerFormGroup.getRawValue()))
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
