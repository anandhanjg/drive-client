import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../api-endpoints.service';
import { HttpService } from '../http/http.service';
import {map} from 'rxjs/operators';
import { ApiResponse, Profile } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  profile:any;

  constructor(private http:HttpService) { 
    this.profile=null;
  }

  isAuthenticated():boolean{
    return !!localStorage.getItem('session-id');
  }

  storeToken(token:string){
    localStorage.setItem('session-id',token);
  }

  clearSession(){
    localStorage.clear();
  }

  logout(){
    this.clearSession();
    window.location.href="/"
  }

  login<ApiResponse>(body:any):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.login,body).pipe(map((r:any)=>{
      if(r && r.success)
        this.storeToken(r.payload.token);
      return r;
    }));
  }

  register<ApiResponse>(body:any):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.register,body);
  }

  getProfile<ApiResponse>():Observable<ApiResponse>{
    return this.http.getService<ApiResponse>(ApiEndpoints.profile).pipe(map((r:any)=>{
      if(r && r.success){
        this.profile=r.payload.profile;
      }
      return r;
    }));
  }

  returnProfile():any{
    return this.profile;
  }

  

}
