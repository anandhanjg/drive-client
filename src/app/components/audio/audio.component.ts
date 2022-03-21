import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service/file.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  audios:any[]=[];
  constructor(private fs:FileService) { }
  audio:any=document.createElement('audio');
  ngOnInit(): void {
    this.fs.audios.subscribe(v=>{
      this.audios=this.fs.audios.value.filter(a=>this.audio.canPlayType(a.mimeType));
    })
  }

}
