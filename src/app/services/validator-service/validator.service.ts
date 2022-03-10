import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  customPasswordValidator(password:string,confirmPassword:string):(fb:FormGroup)=>void{
    return (fb:FormGroup)=>{
      const pc=fb.controls[password];
      const cpc=fb.controls[confirmPassword];
      if(cpc.errors && !cpc.errors.mustMatch) return;
      if(cpc.value!==pc.value){
        cpc.setErrors({mustMatch:"Password Mismatch"})
      }else{
        cpc.setErrors(null);
      }
    };
  }
}
