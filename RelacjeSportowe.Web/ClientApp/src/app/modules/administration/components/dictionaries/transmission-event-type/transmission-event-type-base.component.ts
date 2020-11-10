import { FormGroup } from '@angular/forms';

export abstract class TransmissionEventTypeBaseComponent {
  public transmissionEventForm: FormGroup = new FormGroup({});

  public get value() {
    return this.transmissionEventForm.get('value');
  }
}
