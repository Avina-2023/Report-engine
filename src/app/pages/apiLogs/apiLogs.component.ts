import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ColDef  } from 'ag-grid-enterprise';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule, DatePipe } from '@angular/common';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { ButtonRendererComponent } from '../../renderer/button-renderer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-apiLogs',
  templateUrl: './apiLogs.component.html',
  styleUrls: ['./apiLogs.component.scss'],
  standalone: true,
  imports: [CommonModule,NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule,
    MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent,
    MinidetailscardComponent,MatDialogModule],
})

export class ApiLogsComponent implements OnInit {
  datepipe: any;
  tabdate:  any;
  date7:any;
  rowData: any;

  constructor(
    private apiservice: ApiService,
    ) { }

	ngOnInit() {
    this.apiLogs()
  }

  daterrange(event:any){

    if(event.length){
     this.tabdate = {
        startdate: event ? moment(event[0]).format('yyyy-MM-DD HH:mm') : '',
        enddate: event ? moment(event[1]).format('yyyy-MM-DD HH:mm') : '',
   }
   this.apiLogs()

 }
 }
 apiLogs(){

 this.apiservice.reportDataFetch(this.tabdate,"getApiLogs").subscribe((res: any) => {
  this.rowData = {data: res.data}
  console.log("apilogs",this.rowData);
 })

}
}
