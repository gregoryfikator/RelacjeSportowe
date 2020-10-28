import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  }

  public iconClick(): void {
    this.actionButtonClicked.emit();
  }
}
