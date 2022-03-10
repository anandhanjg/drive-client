import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'File';
  
  isLoggedIn:boolean=false;
  ngOnInit(): void {
    if(localStorage.getItem("session-id") && localStorage.getItem("session-id")!="undefined"){
        this.isLoggedIn=true;
    }
  }
}
