import { FormGroup } from "@angular/forms";

export function MustMatch(controlName: string, mtchingControllerName: string){
  return (formGroup:FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[mtchingControllerName];

    if(matchingControl.errors && matchingControl.errors.mustMatch){
      return;
    }

    if(control.value !== matchingControl.value){
      matchingControl.setErrors({mustMatch: true});
    }else{
      matchingControl.setErrors(null);
    }
  }
}
