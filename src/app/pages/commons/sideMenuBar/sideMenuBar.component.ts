import { Component, OnInit } from '@angular/core';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
@Component({
  selector: 'app-sideMenuBar',
  templateUrl: './sideMenuBar.component.html',
  styleUrls: ['./sideMenuBar.component.scss']
})
export class SideMenuBarComponent implements OnInit {
  menuState: boolean = true;
  APP_CONSTANTS  = APP_CONSTANTS;
  isAdmin:boolean = false
  constructor(private messenger:InterComponentMessenger) {
    let userDetails:any = localStorage.getItem('userDetails');
    this.messenger.getMessage().subscribe((data)=>{
      console.log('inside sidemenu')
      console.log(data );
      if(userDetails?.roleId == "SADM"){
        this.isAdmin = true;
      }
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
