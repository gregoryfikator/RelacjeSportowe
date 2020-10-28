import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function MustMatchValidator(sourceControlName: string, matchingControlName: string): ValidatorFn {
  return (formGroupControl: AbstractControl): { [key: string]: any } | null => {
    var sourceControl = formGroupControl.get(sourceControlName);
    var matchingControl = formGroupControl.get(matchingControlName);

    if (sourceControl.value !== matchingControl.value) {
      var currentErrors = matchingControl.errors;
      if (currentErrors == null) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      }
    } else {
      if (currentErrors != null && currentErrors["mustMatch"] != null) {
        matchingControl.setErrors(null);
      }
    }

    return null;
  };
}