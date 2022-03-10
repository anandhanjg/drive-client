import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted:boolean=false;
  login:FormGroup;
  loading:boolean=false;

  constructor(private authService:AuthService,private router:Router,private fb:FormBuilder) { 
    this.login=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl("/app");
    }
  }

  get loginControls(){
    return this.login.controls;
  }

  onSubmit(e:any):void{
    this.submitted=true;
    if(this.login.invalid) return;
    this.loading=true;
    this.authService.login(this.login.value).subscribe((r:any)=>{
      if(r.success){
        this.router.navigateByUrl('/app');
      }else{
        alert(r.message);
      }
    },err=>{
      alert(err.message || err);
    },()=>{
      this.loading=false;
      this.submitted=false;
    })
  }

  

}
