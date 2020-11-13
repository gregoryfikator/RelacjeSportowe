import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.less']
})
export class FormTextAreaComponent implements OnInit {

  @Input() public formCtrl: FormControl;

  private _currentType: string;

  get currentType(): string {
    return this._currentType;
  }

  set currentType(value: string) {
    this._currentType = value;
  }

  @Input() public idPrefix: string;
  @Input() public label: string;
  @Input() public required: boolean;

  public id: string;

  constructor() {
  }

  ngOnInit(): void {
    this.id = this.idPrefix + "FormInput";
  }
}
