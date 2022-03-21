import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models';
import { ApiEndpoints } from '../api-endpoints.service';
import { HttpService } from '../http/http.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public audios:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);
  public videos:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);
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

  getAudios<ApiResponse>():Observable<ApiResponse>{
    return this.http.getService<ApiResponse>(ApiEndpoints.scan,{fileType:'audio'}).pipe(map((resp:any)=>{
        this.audios.next(resp?.payload?.nodes || []);
    }));
  }

  getVideos<ApiResponse>():Observable<ApiResponse>{
    return this.http.getService<ApiResponse>(ApiEndpoints.scan,{fileType:'video'}).pipe(map((resp:any)=>{
      this.videos.next(resp?.payload?.nodes || []);
    }));
  }


  mvDirect<ApiResponse>(newPath:string,oldPath:string,fileName:string):Observable<ApiResponse>{
    return this.http.postService<ApiResponse>(ApiEndpoints.mvDirect,{newPath,oldPath,fileName});
  }
}
