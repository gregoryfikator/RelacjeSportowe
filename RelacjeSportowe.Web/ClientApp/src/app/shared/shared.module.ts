import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoSpinnerComponent } from './components/auto-spinner/auto-spinner.component';
import { FormInputComponent } from './components/controls/form-input/form-input.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordInputComponent } from './components/controls/password-input/password-input.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { ModalPanelComponent } from './components/modal-panel/modal-panel.component';
import { ModulePanelComponent } from './components/module-panel/module-panel.component';

@NgModule({
  declarations: [
    AutoSpinnerComponent,
    FormInputComponent,
    PasswordInputComponent,
    ModalPanelComponent,
    ModulePanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    AngularSlickgridModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    AngularSlickgridModule,
    AutoSpinnerComponent,
    FormInputComponent,
    PasswordInputComponent,
    ModalPanelComponent,
    ModulePanelComponent
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
