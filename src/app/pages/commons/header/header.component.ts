import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('matDialog', { static: false }) matDialogRef: any;
 public name:any;
  constructor(
    private authConfig: AppConfigService,
    private dialog: MatDialog,
  ) { 
 
  }

  ngOnInit() {
   this.name=localStorage.getItem('firstname')
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
