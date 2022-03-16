import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models';
import { ApiEndpoints } from '../api-endpoints.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpService) { }
  
  ls<FileListResponse>(path:string="/"):Observable<FileListResponse>{
      return this.http.getService<FileListResponse>(ApiEndpoints.fileLs,{FOLDER_PATH:path})
  }

  mkdir<ApiResponse>(path:string="/",name?:string):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.mkdir,{path,name});
  }

  rm<ApiResponse>(path:string):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.rm,{path})
  }

  touch<ApiResponse>(data:FormData):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.touch,data);
  }

  mv<ApiResponse>(path:string,oldName:string,newName:string):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.mv,{path,oldName,newName});
  }

  read(filePath:string):any{
    return this.http.fileGetService('/file/read',{filePath});
  }

}
