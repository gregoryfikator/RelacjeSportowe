import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoSpinnerComponent } from './components/auto-spinner/auto-spinner.component';

@NgModule({
  declarations: [
  AutoSpinnerComponent
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
    AutoSpinnerComponent
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
