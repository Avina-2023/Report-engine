import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
myvar="newvar"
items=[
  {
    name:"g"
  },
  {
    name:"a"
  },
  {
    name:"v"
  }
]
  constructor() { }

  ngOnInit() {
  }

}
