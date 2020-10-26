import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class FormInputComponent implements OnInit {

  @Input() public controlName: string;

  @Input() public type: string;
  @Input() public label: string;
  @Input() public required: boolean;

  @Input() public icon: IconDefinition;

  @Output() actionButtonClicked: EventEmitter<any> = new EventEmitter();

  public id: string;

  constructor() {
  }

  ngOnInit() {
    this.id = this.controlName + "FormInput";
  }

  public iconClick(): void {
    this.actionButtonClicked.emit();
  }
}
