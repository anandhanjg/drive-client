import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FileService } from 'src/app/services/file-service/file.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {
  audios:any[]=[];
  profile:any;
  volume:number=20;
  audio:any=document.createElement('audio');;
  constructor(private fs:FileService,private as:AuthService) { 
    
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    console.log("DESTROYING PAGE");
    this.audio.pause();
    this.audio.src=null;
    // this.audio=null;
  }
  
  songPlaying:boolean=false;
  songIndex:number=0;
  ngOnInit(): void {
    console.log("ON INIT");
    // this.audio=document.createElement('audio');
    this.profile=this.as.returnProfile();
    this.setVolume();
    this.fs.audios.subscribe(v=>{
      this.audios=this.fs.audios.value.filter(a=>this.audio.canPlayType(a.mimeType));
    })
    this.audio.onended=this.playNext.bind(this);
  }

  playOrPause(){
    if(!this.songPlaying){
      this.playSong(true);
    }else{
      this.pauseSong();
    }
    // this.songPlaying=!this.songPlaying;
  }

  playSong(playCurrent?:boolean){
    if((playCurrent && !this.audio.src) || !playCurrent)
      this.audio.src='https://anandhan.ddl.link:4000/'+this.profile.username+'/'+this.audios[this.songIndex].path;
    this.audio.play();
    this.songPlaying=true;
  }

  pauseSong(){
    this.audio.pause();
    this.songPlaying=false;
  }

  playNext(){
    if(this.songIndex==this.audios.length-1){
      this.songIndex=0;
    }else{
      this.songIndex+=1;
    }
    this.playSong();
  }

  playPrevious(){
    if(this.songIndex>0){
      this.songIndex-=1;
    }else{
      this.songIndex=this.audios.length-1;
    }
    this.playSong();
  }

  changeVolume(event:any){
    this.volume=event.target.value;
    this.setVolume()
  }

  setVolume(){
    this.audio.volume=this.volume/100;
  }

}
