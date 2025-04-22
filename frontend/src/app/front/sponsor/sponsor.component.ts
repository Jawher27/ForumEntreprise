import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  focus: any;
  focus1: any;


  ngOnInit() {}
  constructor(private router: Router ) {}

 
  getPath(){
    return this.router.url;
  }

}
