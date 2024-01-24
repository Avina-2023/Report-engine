import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-enterprise';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexFill, ApexYAxis, ApexTooltip, ApexTitleSubtitle, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexTheme, NgApexchartsModule } from "ng-apexcharts";
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excelService';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { ButtonRendererComponent } from '../../renderer/button-renderer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  theme: ApexTheme;
};

@Component({
  selector: 'app-userDashboard',
  templateUrl: 'userDashboard.component.html',
  styleUrls: ['./userDashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, NzDatePickerModule, ReactiveFormsModule, FormsModule, NgApexchartsModule, MatButtonModule, MatIconModule, AgGridModule, MatCardModule,MinidetailscardComponent,MatDialogModule,CommonreportviewComponent]
})

export class UserDashboardComponent implements OnInit {

  @ViewChild('matDialog', { static: false })
  matDialogRef!: TemplateRef<any>;
  @ViewChild('matDialgrid', { static: false })
  matDiagridRef!: TemplateRef<any>;

  responseData: any;
  DashboardData: any;
  batchCount: any;
  total: any;
  ColDef: any;
  rowData: any;
  total_candidate: any;
  completed: any;
  Started: any;
  inprogress: any;
  terminated: any;
  proctorStarted: any;
  Yet_to_Start: any;
  date7: Date[] = [];
  userLog: any;
  popupMessage: any;
  popUpData: any;
  is_download: any;

  constructor(
    private apiservice: ApiService,
    public loader: LoaderService,
    public utility: AppConfigService,
    private excelService:ExcelService,
    private dialog: MatDialog
  ){

  }

  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

	ngOnInit() {
    this.getUserDashboardAPI();
  }
  frameworkComponents: any = {
    buttonRenderer: ButtonRendererComponent,
  };

  getUserDashboardAPI() {

    if(this.utility.getUserOrg()===57){

    }
    else{

      this.total_candidate=0
      this.completed=0
      this.Yet_to_Start=0
      this.inprogress=0
      this.terminated=0
      this.proctorStarted=0

      this.apiservice.liveUserDashboard(this.DashboardData).subscribe((res: any) => {

        this.responseData = res.data;
        if(this.responseData.length ){

        }else{
          this.responseData = [];
        }

        this.dynamicallyConfigureColumnsFromObject(this.responseData);

        res.data.forEach((_item:any,_index:any)=>{

          this.total_candidate= res.data.length
          if(_item.Test_Status=="Finished"){
            this.completed= this.completed + 1
          }else if(_item.Test_Status=="YetToStart"){
            this.Yet_to_Start= this.Yet_to_Start + 1
          }else if(_item.Test_Status=="Active"){
            this.inprogress= this.inprogress + 1
          }else if(_item.Test_Status=="Terminated"){
            this.terminated= this.terminated + 1
          }
          if(_item.Proctor_Status=="started"){
            this.proctorStarted= this.proctorStarted + 1
          }

        })


    });
    }

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

        }),

      );

    }
    this.agGrid.api.setColumnDefs(this.columnDefs);
      this.agGrid.api.setRowData(anObject);
      this.rowData=anObject
      this.columnDefs.push({
        headerName: 'auditLog',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          buttons: [
            { label: 'Get Logs',color: '#32557f' },
          ],
        },
        sortable: false,
        filter: false,
        width: 150, // Adjust the width as needed
      });
  }
  daterrange(event:any) {

    if (event.length==2) {
      let dateparams = {
        startdate: event ? moment(event[0]).format('yyyy-MM-DD HH:mm') : '',
        enddate: event ? moment(event[1]).format('yyyy-MM-DD HH:mm') : '',
      };
      this.DashboardData = dateparams;
      this.getUserDashboardAPI();

    }
  }
  excelexport(params: any) {
    this.excelService.exportAsExcelFile(params, 'report');
  }

  onBtnClick(params: any) {
    if (params.label === "Get Logs") {

      if (params && params.rowData && params.rowData.Result_Id) {
        this.userLog = { "result_id": params.rowData.Result_Id }
        this.apiservice.reportDataFetch(this.userLog, "userResponse").subscribe((res: any) => {
          if (res.data && res.data?.length) {
            this.is_download= false
            this.popUpData =  { data: res.data} ;
            this.matPopUpOpen()
          }
        });
      } else {
        this.popupMessage = "User have not started or attented any questions"
        this.matDialogOpen()
      }
    }
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms'
    });
  }
  matPopUpOpen() {
    const dialogRef = this.dialog.open(this.matDiagridRef, {
      width: '1000px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms'
    });
  }
  popupClose(){
    this.dialog.closeAll(); // Close all open dialogs
  }

}

