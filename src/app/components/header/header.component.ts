import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navOptions:any={
    files:'files',
    images:'images',
    movies:'movies',
    profile:'profile',
    music:'music'
  }
  selected:string="files";
  show:boolean=false;
  width:number=window.screen.width;
  constructor() { }

  ngOnInit(): void {
    window.onresize=(ev:any)=>{
      this.width=window.screen.width;
    }
  }

  onNavChange(id:string){
    this.selected=id;
  }

}
