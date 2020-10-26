import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.less'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class PasswordInputComponent implements OnInit {

  @Input() public controlName: string;

  @Input() public label: string;
  @Input() public required: boolean;

  public id: string;

  public passwordVisible: boolean = false;

  public faEye: IconDefinition = faEye;
  public faEyeSlash: IconDefinition = faEyeSlash;

  constructor() {
  }

  ngOnInit() {
    this.id = this.controlName + "FormInput";
  }

  public passwordToggle(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
