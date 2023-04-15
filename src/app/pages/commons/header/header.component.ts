import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
  button = 'Submit';
  isLoading = false;
 public name:any;
 isOpenMenu = true;

  constructor(
    private authConfig: AppConfigService,
    private dialog: MatDialog,
    private messenger:InterComponentMessenger
  ) { 
    this.messenger.sendMessage("sideMenuToggle",this.isOpenMenu)
  }

  ngOnInit() {
   this.name=this.authConfig.getLocalValue('firstname')
  }

  // initializeLoader() {
  //   this.isLoading = true;
  //   this.button = 'Processing';

  //   setTimeout(() => {
  //     this.isLoading = false;
  //     this.button = 'Submit';
  //     alert('Done loading');
  //   }, 2000)
  // }
  menuToggle(){
    this.isOpenMenu = !this.isOpenMenu
    this.messenger.sendMessage("sideMenuToggle",this.isOpenMenu)
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {

    });
  }
  closeDialog(e: any) {
    this.dialog.closeAll();
    this.authConfig.logout();
  }
  logout(){
    this.matDialogOpen()
  }
}
