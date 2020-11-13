import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent implements OnInit {

  @Input() public formCtrl: FormControl;

  @Input() public type: string;

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

  @Input() public icon: IconDefinition;

  @Output() actionButtonClicked: EventEmitter<any> = new EventEmitter();

  public id: string;

  constructor() {
  }

  ngOnInit(): void {
    this.id = this.idPrefix + "FormInput";

    if (this.type === 'date' || this.type === 'time') {
      this.currentType = 'text';
    } else {
      this.currentType = this.type;
    }
  }

  public iconClick(): void {
    this.actionButtonClicked.emit();
  }

  public onFocus(event: any): void {
    if (this.type === 'date') {
      this.currentType = 'date';
    } else if (this.type === 'time') {
      this.currentType = 'time';
    }
  }

  public onBlur(event: any): void {
    if (this.currentType === 'date' || this.currentType === 'time') {
      this.currentType = 'text';
    }
  }
}
