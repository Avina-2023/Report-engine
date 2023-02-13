import { Component, OnInit } from '@angular/core';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';

@Component({
  selector: 'app-sideMenuBar',
  templateUrl: './sideMenuBar.component.html',
  styleUrls: ['./sideMenuBar.component.scss']
})
export class SideMenuBarComponent implements OnInit {
  menuState: boolean = false;

  constructor(private messenger:InterComponentMessenger) {

    this.messenger.getMessage().subscribe((data)=>{
      console.log('inside sidemenu')
      console.log(data);
      if(data?.head === "sideMenuToggle"){
        this.menuState = data.value
      }
  })

   }

  ngOnInit() {
    var openCloseBtn = document.querySelector("#openCloseBtn");
var sidebar = document.querySelector(".sidebar");
var sidebarNav = document.querySelector(".sidebar-nav");



  }




}
