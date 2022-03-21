import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FileService } from '../services/file-service/file.service';

@Injectable({
  providedIn: 'root'
})
export class VideoResolver implements Resolve<any> {

  constructor(private fs:FileService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fs.getVideos();
  }
}
