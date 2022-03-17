import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpoints {

  constructor() { }
  static url:string=!true?"http://localhost:4000":'https://anandhan.ddl.link:4000';


  static fileLs:string="/file/ls";
  static mkdir:string="/file/mkdir"
  static rm:string="/file/rm";
  static touch:string="/file/touch";
  static mv:string="/file/mv";

  static login:string="/user/login";
  static register:string="/user/register";
  static profile:string="/user/profile";
}
