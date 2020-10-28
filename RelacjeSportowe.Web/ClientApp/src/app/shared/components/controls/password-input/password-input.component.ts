import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.less']
})
export class PasswordInputComponent implements OnInit {

  @Input() public formCtrl: FormControl;

  @Input() public label: string;
  @Input() public idPrefix: string;
  @Input() public required: boolean;

  public id: string;

  public passwordVisible: boolean = false;

  public faEye: IconDefinition = faEye;
  public faEyeSlash: IconDefinition = faEyeSlash;

  constructor() {
  }

  ngOnInit() {
    this.id = this.idPrefix + "FormInput";
  }

  public passwordToggle(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
