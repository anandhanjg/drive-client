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
  constructor() { }

  ngOnInit(): void {
  }

  onNavChange(id:string){
    this.selected=id;
  }

}
