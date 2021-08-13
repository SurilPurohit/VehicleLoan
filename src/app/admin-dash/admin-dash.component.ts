import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

  uname:any;

  constructor() { }

  ngOnInit(): void {
    this.uname = localStorage.getItem('uname');
  }

}
