import { Component, forwardRef, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const FORM_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true,
};

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less'],
  //providers: [FORM_INPUT_VALUE_ACCESSOR]
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

  public id: string;

  @Input() value: any = '';
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_:any) => {};

  constructor() {
  }

  ngOnInit() {
    this.id = this.controlName + "FormInput";
  }

  get inputValue(): any {
    return this.value;
  }

  set inputValue(value: any) {
    if (value !== this.value) {
      this.value = value;
      this._onChangeCallback(value);
    }
    
    this._onTouchedCallback();
  }
  
  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
