import { Component, OnInit } from '@angular/core';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
    selector: 'app-sideMenuBar',
    templateUrl: './sideMenuBar.component.html',
    styleUrls: ['./sideMenuBar.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, RouterLinkActive, RouterLink]
})
export class SideMenuBarComponent implements OnInit {
  menuState: boolean = true;
  APP_CONSTANTS  = APP_CONSTANTS;
  isAdmin:boolean = false
  isCC:boolean = false;
  isOPS: boolean = false;
  constructor(private messenger:InterComponentMessenger,private utility: UtilityService) {
    let userDetails:any = localStorage.getItem('userDetails');
    if(JSON.parse(userDetails)?.roleId == "SADM"){
      this.isAdmin = true;
    }
    if(JSON.parse(userDetails)?.roleId == "CC"){
      this.isCC = true;
    }
    if(JSON.parse(userDetails)?.roleId == "OPS"){
      this.isOPS = true;
    }
    this.messenger.getMessage().subscribe((data)=>{
      console.log('inside sidemenu')
      console.log(data );

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
