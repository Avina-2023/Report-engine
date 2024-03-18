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
import { ButtonRendererComponent } from 'src/app/renderer/button-renderer.component';

@Component({
    selector: 'app-examStatusReport',
    templateUrl: './examStatusReport.component.html',
    styleUrls: ['./examStatusReport.component.scss'],
    standalone: true,

    imports: [CommonModule,NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule, MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent,MinidetailscardComponent,MatTooltipModule,MatSelectModule,MatCardModule],
})
export class ExamStatusReportComponent implements OnInit {
  position = new FormControl("Aptitude");
  TooltipPosition: any = ['Aptitude', 'Behavioural', 'Coding'];
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
  toolTipData: string = 'Aptitude';
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
  behaviouralList = [
    {
      behaviouralLabel: "User Behavioural Report",
      is_enable: true,
      is_download: true,
      endpoint: "getUserBehaviouralReport"
    }
  ]
  codingList = [
    {
      codingLabel: "Score Report",
      is_enable: true,
      is_download: true,
      endpoint: "getCodingResults"
    }
  ]
  legendData: any;
  showLegend: any;
  popupMessage: any;

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

    let utilityLog = {
      report_Name: "Utility Logs",
      endpoint: "getCbtEventLog",
      is_enable: true,
      is_download: false,
      isLegend: true
    }


    if (utility.getUserOrg() === "57") {
      this.reportList.push(show_Audit)
      this.reportList.push(show_AdminLog)
      this.reportList.push(feedbackDataReport)
      this.reportList.push(utilityLog)
    } else {
      this.reportList.push(sectionReport)
    }

  }

  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  };

  ngOnInit() {
    this.tabchange(0)
  }
  frameworkComponents: any = {
    buttonRenderer: ButtonRendererComponent,
  };
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

  onBtnClick(params: any) {
    console.log("params",params);

    if (params.label === "View Report") {
      console.log("params.rowData.Result_Id",params.rowData.user_Mail);

      const url = 'https://skillexchange.lntedutech.com/auth/reports/viewreport/'+params.rowData.user_Mail;
      console.log("url",url);

      const data = {
        username: 'superadmin@dispoatable.com',
        password: 'Test@123'
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      // this.userLog = { "result_id": params.rowData.Result_Id }
      // this.apiservice.reportDataFetch(this.userLog, "getAuditPdfReport").subscribe((res: any) => {
      //   if (res.success === true && res.data && res.data?.length) {
      //     this.matPdfOpen()
      //   } else {
      //     this.popupMessage = "User have not started or attented any questions"
      //     this.matDialogOpen()
      //   }
      // });
    }
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
  isColumnPinned(columnKey: string): boolean | 'left' | 'right' | null {
    if (columnKey === 'User_Mail') {
      return 'left';
    } else if (columnKey === 'ViewReport') {
      return 'right';
    }
    return null;
  }
  dynamicallyConfigureColumnsFromObject(anObject: any) {
    this.ColDef = this.agGrid.api.getColumnDefs();
    this.ColDef.length = 0;
    this.columnDefs = [];
    if (anObject?.length) {

      const keys = Object.keys(anObject[0]);

      keys.forEach((key) =>

        this.columnDefs.push({
          field: key,
          headerName: key.replaceAll('_', ' ').replaceAll('Time', 'Date'),
          pinned: this.isColumnPinned(key),
        }),

      );

    }
    this.agGrid.api.setColumnDefs(this.columnDefs);
    this.agGrid.api.setRowData(anObject);
    this.rowData = anObject
    this.columnDefs.push({
        headerName: 'ViewReport',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          buttons: [
            { label: 'View Report', color: '#32557f' },
          ],
        },
        sortable: false,
        filter: false,
        width: 150, // Adjust the width as needed
        pinned: this.isColumnPinned("ViewReport"),
    });
  }

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
        if (this.toolTipData === "Behavioural"){
          this.dynamicallyConfigureColumnsFromObject(res.data)
        } else{
          this.rowData = { data: res.data };
        }
      } else {
        this.alertservice.toastfire('warning', res.message);
        if (this.toolTipData === "Behavioural"){
          this.dynamicallyConfigureColumnsFromObject([])
        } else{
          this.rowData = { data: [] };
        }
      }
    });
  }

  tabchange(index: any) {
    this.currentTabIndex = index;
    this.rowData = []
    if(this.toolTipData === "Aptitude"){
      this.reportList.forEach((tab: any, i: number) => {
        if (index == i) {
          this.showLegend = tab?.isLegend
          this.customTabDataFiller(this.tabdate, tab.endpoint)
        }
      });
    } else if (this.toolTipData === "Behavioural"){
      this.behaviouralList.forEach((tab: any, i: number) => {
        if (index == i) {
          this.customTabDataFiller(this.tabdate, tab.endpoint)
        }
      });
    } else if (this.toolTipData === "Coding"){
      this.codingList.forEach((tab: any, i: number) => {
        if (index == i) {
          this.customTabDataFiller(this.tabdate, tab.endpoint)
        }
      });
    }

  }

  onSelectionChange(event: any) {
    this.toolTipData = event.value;
    this.tabchange(0)
  }
}
