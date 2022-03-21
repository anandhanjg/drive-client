import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service/file.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videos:any[]=[];
  constructor(private fs:FileService) { }
  video:any=document.createElement('video');
  ngOnInit(): void {
    this.fs.videos.subscribe(v=>{
      this.videos=this.fs.videos.value.filter(v=>this.video.canPlayType(v.mimeType));
      console.log(this.videos);
    })
  }

}
