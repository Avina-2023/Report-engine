import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-tab-head',
  standalone: true,
  imports: [CommonModule,RouterLink,MatMenuModule,MatButtonModule,NgClass, NgIf, RouterLinkActive, RouterLink],
  templateUrl: './tab-head.component.html',
  styleUrls: ['./tab-head.component.scss'],
})
export class TabHeadComponent implements OnInit {
  menuState: boolean = true;
  app_const= APP_CONSTANTS
  isSuperAdmin:boolean= false
  isAdmin:boolean = false
  isCC:boolean = false;
  isOPS: boolean = false;
  isCBT: boolean = false;
  isAdmincc: boolean = false;
  constructor(private utility: UtilityService) {
    let userDetails:any = localStorage.getItem('userDetails');
    if(JSON.parse(userDetails)?.roleId == "SADM"){
      this.isSuperAdmin = true;
    }
    if(JSON.parse(userDetails)?.roleId == "ADM"){
      this.isAdmin = true;
    }
    if(JSON.parse(userDetails)?.roleId == "CC"){
      this.isCC = true;
    }
    if(JSON.parse(userDetails)?.roleId == "LMSADMIN"){
      this.isAdmincc = true
    }
    if(JSON.parse(userDetails)?.roleId == "OPS"){
      this.isOPS = true;
    }
    if(JSON.parse(userDetails)?.roleId == "CBT"){
      this.isCBT = true;
    }
  }

  ngOnInit() {


  }

}
