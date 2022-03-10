import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ValidatorService } from 'src/app/services/validator-service/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register:FormGroup;
  submitted:boolean=false;
  loading:boolean=false;
  constructor(private authService:AuthService,private router:Router,private fb:FormBuilder,private vs:ValidatorService) {
    this.register=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      fullName:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{
      validator:this.vs.customPasswordValidator('password','confirmPassword')
    })
  }
  
  get registerControls(){
    return this.register.controls;
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl("/app");
    }

  }

  onSubmit():void{
    this.submitted=true;
    if(this.register.invalid)
      return;
    this.loading=true;
    this.authService.register(this.register.value).subscribe((r:any)=>{
      if(r.success){
        this.router.navigateByUrl("/login")
      }else{
        alert(r.message);
      }
    },err=>{
      alert(err.message);
    },()=>{
      this.loading=false;
      this.submitted=false;
    });
  }

  reset():void{
    this.register.reset();
    this.submitted=false;
  }
}
