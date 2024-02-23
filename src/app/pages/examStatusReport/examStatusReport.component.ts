import {  Component, OnInit, ViewChild } from '@angular/core';
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
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {  MatCardModule } from '@angular/material/card';
import { AlertServiceService } from 'src/app/services/alertService.service';

@Component({
    selector: 'app-examStatusReport',
    templateUrl: './examStatusReport.component.html',
    styleUrls: ['./examStatusReport.component.scss'],
    standalone: true,

    imports: [CommonModule,NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule, MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent,MinidetailscardComponent,MatTooltipModule,MatSelectModule,MatCardModule],
})
export class ExamStatusReportComponent implements OnInit {
  position = new FormControl("Aptitude");
  TooltipPosition: any = ['Aptitude', 'Behavioural', 'Step'];
  userData = { "date": "2023/02/14" };
  datepipe = new DatePipe('en-us')
  datewise: any = {}
  obj: any;
  rowData: any = [];
  keyData: any = [];
  ColDef: any;
  value: Date[] | undefined;
  date7: any;
  sidenav: any;
  tabdate: any;
  currentTabIndex = 0;
  toolTipData: any;
  reportList = [
    {
      report_Name: "Score Report",
      is_enable: true,
      is_download: true,
      endpoint: (this.utility.getUserOrg() === "57") ? "getsectiondetails" : "dateWiseSectionReport"
    },
    {
      report_Name: "Item wise Report",
      is_enable: true,
      is_download: true,
      endpoint: (this.utility.getUserOrg() === "57") ? "getitemdetails" : "dateWiseitemReport"
    }
  ]
  legendData: any;
  showLegend: any;
  // colDefs: any=[];
  constructor(
    private apiservice: ApiService,
    private utility: AppConfigService,
    private alertservice: AlertServiceService
  ) {

    let show_Audit = {
      report_Name: "User Audit Log",
      endpoint: "getauditlogs",
      is_enable: true,
      is_download: true
    };

    let show_AdminLog = {
      report_Name: "Admin Log",
      endpoint: "getadminlogs",
      is_enable: true,
      is_download: true
    };


    let sectionReport = {
      report_Name: "Section Report",
      endpoint: "sectionScoreCard",
      is_enable: true,
      is_download: true
    }

    let feedbackDataReport = {
      report_Name: "User Feedback",
      endpoint: "getFeedback",
      is_enable: true,
      is_download: false,
      isLegend: true
    }


    if (utility.getUserOrg() === "57") {
      this.reportList.push(show_Audit)
      this.reportList.push(show_AdminLog)
      this.reportList.push(feedbackDataReport)
    } else {
      this.reportList.push(sectionReport)
    }

  }

  public columnDefs: ColDef[] = []

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  };

  ngOnInit() {
    this.tabchange(0)
  }
  daterrange(event: any) {
    if (event.length) {
      this.tabdate = {
        "startdate": event ? this.datepipe.transform(event[0], 'yyyy-MM-dd HH:mm') : "",
        "enddate": event ? this.datepipe.transform(event[1], 'yyyy-MM-dd HH:mm') : ""
      }
      this.tabchange(this.currentTabIndex);
    }
  }
  clickHandler() {
    this.sidenav.close();
  }

  dateWiseSectionReport(data: any) {
    let endPoint = "dateWiseSectionReport"
    if (this.utility.getUserOrg() === 57) {
      endPoint = "getsectiondetails"
    }
    this.apiservice.dateWiseSectionReport(data, endPoint).subscribe((res: any) => {
      this.rowData = { "data": res.data, "key": res.key }
    })
  }

  // dateWiseitemReport(data:any){
  //   let endPoint = "dateWiseitemReport"
  //   if(this.utility.getUserOrg() === 57){
  //     endPoint = "getitemdetails"
  //   }
  //   this.apiservice.dateWiseitemReport(data,endPoint).subscribe((res:any)=>{
  //     this.rowData = res.data
  //   })
  // }

  customTabDataFiller(data: any, endPoint: string) {
    this.apiservice.reportDataFetch(data, endPoint).subscribe((res: any) => {
      if (res.legend) {
        this.legendData = res?.legend;
      }
      if (res.key && res.key?.length) {
        this.alertservice.toastfire('success', res.message);
        this.rowData = { data: res.data, key: res.key };
      } else if (res.data && res.data?.length) {
        this.alertservice.toastfire('success', res.message);
        this.rowData = { data: res.data };
      } else {
        this.alertservice.toastfire('warning', res.message);
      }
    });
  }

  tabchange(index: any) {
    this.currentTabIndex = index;
    this.rowData = []
    this.reportList.forEach((tab: any, i: number) => {
      if (index == i) {
        this.showLegend = tab?.isLegend
        this.customTabDataFiller(this.tabdate, tab.endpoint)
      }
    });
  }

  onSelectionChange(event: any) {
    const selectedValue = event.value;
    this.toolTipData = { "event": event.value }
  }
}
