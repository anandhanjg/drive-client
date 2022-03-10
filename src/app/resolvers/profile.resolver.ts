import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any>{

  constructor(private authService:AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any>|Promise<any>|any {
    if(this.authService.isAuthenticated()){
      return this.authService.getProfile();
    }
    return;
  }


}
