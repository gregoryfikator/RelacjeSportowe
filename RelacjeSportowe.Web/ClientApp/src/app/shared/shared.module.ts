import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSlickgridModule } from 'angular-slickgrid';

import { UserService } from './services/user.service';
import { AutoSpinnerComponent } from './components/auto-spinner/auto-spinner.component';
import { FormInputComponent } from './components/controls/form-input/form-input.component';
import { PasswordInputComponent } from './components/controls/password-input/password-input.component';
import { ModalPanelComponent } from './components/modal-panel/modal-panel.component';
import { ModulePanelComponent } from './components/module-panel/module-panel.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormTextAreaComponent } from './components/controls/form-text-area/form-text-area.component';


@NgModule({
  declarations: [
    AutoSpinnerComponent,
    FormInputComponent,
    PasswordInputComponent,
    ModalPanelComponent,
    ModulePanelComponent,
    DateAgoPipe,
    FormTextAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularSlickgridModule,
    NgxSpinnerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularSlickgridModule,
    NgxSpinnerModule,
    AutoSpinnerComponent,
    FormInputComponent,
    PasswordInputComponent,
    ModalPanelComponent,
    ModulePanelComponent,
    DateAgoPipe,
    FormTextAreaComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        UserService,
        NgxSpinnerService
      ]
    }
  }
}
