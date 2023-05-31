import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgClass } from '@angular/common';
import { AvatarModule } from 'ngx-avatars';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgClass, MatMenuModule, MatIconModule, MatDialogModule, MatButtonModule, AvatarModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
 public username:any;
 isOpenMenu = true;
 

  constructor(
    private authConfig: AppConfigService,
    private dialog: MatDialog,
    private messenger:InterComponentMessenger
  ) { 
    this.messenger.sendMessage("sideMenuToggle",this.isOpenMenu)
  }

  ngOnInit() {
   this.username=this.authConfig.getLocalValue('firstname')
  }

  menuToggle(){
    this.isOpenMenu = !this.isOpenMenu
    this.messenger.sendMessage("sideMenuToggle",this.isOpenMenu)
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      disableClose: true
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
