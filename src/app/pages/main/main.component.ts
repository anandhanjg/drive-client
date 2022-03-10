import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  profile:any;
  constructor(private as:AuthService) { 
    this.profile=this.as.returnProfile();
  }

  ngOnInit(): void {
    console.table(this.profile)
  }

}
