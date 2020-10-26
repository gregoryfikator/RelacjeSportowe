import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoSpinnerComponent } from './components/auto-spinner/auto-spinner.component';
import { FormInputComponent } from './components/controls/form-input/form-input.component';

@NgModule({
  declarations: [
  AutoSpinnerComponent,
  FormInputComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AutoSpinnerComponent,
    FormInputComponent
  ],
  entryComponents: [

  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        UserService
      ]
    }
  }
}
