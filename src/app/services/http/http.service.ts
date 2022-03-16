import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string;
  sessionKey:string="session-id"
  constructor(private http:HttpClient) { 
    this.url=ApiEndpoints.url;
  }  
  getHeaders(others:any={}):HttpHeaders{
    let token=localStorage.getItem(this.sessionKey);
    if(token){
      others["authorization"]="Bearer "+token
    }
    return new HttpHeaders(others)
  }

  postService<Type>(path:string,body:any,headerData?:any,query?:any,withCredentials?:boolean):Observable<Type> | any{
    return this.http.post<Type>(this.url+path,body,{headers:this.getHeaders(headerData),withCredentials,params:query});
  }

  getService<Type>(path:string,query?:any,headerData?:any,withCredentials:boolean=false):Observable<Type>|any{
    return this.http.get<Type>(this.url+path,{
      headers:this.getHeaders(headerData),
      withCredentials,
      params:query
    });
  }

  fileGetService(path:string,query?:any,headerData?:any):any{
    return this.http.get(this.url+path,{responseType:'arraybuffer',headers:this.getHeaders(headerData),params:query})
  }
}
