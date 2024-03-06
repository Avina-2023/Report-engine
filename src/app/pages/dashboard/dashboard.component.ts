import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-enterprise';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { of, groupBy, mergeMap, reduce, map, from, toArray } from 'rxjs';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexFill, ApexYAxis, ApexTooltip, ApexTitleSubtitle, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexTheme, NgApexchartsModule } from "ng-apexcharts";
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excelService';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TinycardComponent } from './widgets/tinycard/tinycard.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [CommonModule, NzDatePickerModule, ReactiveFormsModule, FormsModule, TinycardComponent, NgApexchartsModule,
      MatButtonModule, MatIconModule, AgGridModule, MatCardModule,MatSlideToggleModule,MatTabsModule,MatStepperModule,
      MatGridListModule,MatTooltipModule,MatSelectModule,MatFormFieldModule,MatTableModule,MatPaginatorModule,CommonreportviewComponent]
})
export class DashboardComponent implements OnInit {
  position = new FormControl("All");
  TooltipPosition: any = ['1 Month', '3 Months', '6 Months', '9 Months', '1 Year', 'All'];
  rowData: any;
  ColDef: any;
  @ViewChild('chart') chart?: ChartComponent;
  @ViewChild('chart4') chart4?: ChartComponent;
  @ViewChild('chart5') chart5?: ChartComponent;
  @ViewChild('chart3') chart3?: ChartComponent;
  @ViewChild('ovrAllChrt') ovrAllChrt?: ChartComponent;

  public chartOptions: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public chartOptions5: any;
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  };
  dtRange:any;
  total: any;
  total2: any;
  myvar = 'newvar';
  iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
    '../../../assets/Html/loader.html'
  );
  items = [
    {
      name: 'g',
    },
    {
      name: 'a',
    },
    {
      name: 'v',
    },
  ];


  onewayTP = true;
  @ViewChild('kibona') iframe: ElementRef | undefined;


  html: any;
  htmlfile = '../../../assets/Html/maintanence.html';

  liveData: boolean = false;
  responseData: any;
  eulaContent: any;
  timeoutval: any;
  sparkline: any = [0];
  totalscheduledCount: any;
  loggedinCandidates: any;
  testinProgress: any;
  testCompleted: any;
  chartDetails: any;
  batchCount: any;
  domainCount: any;
  domainSum: any;
  countByClientName: any;
  tabdate:any;
  chart2series: any;
  chart2label: any;
  countByDriveName: any;
  CountDetails: { idle: any; terminate: any } | undefined;
  date7: Date[] = [];
  DashboardData: any;
  socket_subs: any;
  venueCount: number = 0;
  rejected:any;
  stopped:any;
  Started:any;
  accepted:any;
  paused:any;
  template:any;
  created:any;
  tabledata: any;
  currentTabIndex: any;
  DashData: any;
  scheduleData: any;
  datepipe: any;
  chartData: any;
  toolTipData: any;
  clientName: any;
  scheduled: any;
  Inprogress: any;
  Completed: any;
  displayedColumns: any;
  dataSource : any;
  isDownload: any;
  testData: any;
  clientData: any;





  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private apiservice: ApiService,
    public loader: LoaderService,
    private excelService:ExcelService,
    private socketService:WebSocketService,
    public utility: AppConfigService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Total',
          data: [],
        },
      ],
      plotOptions: {
        bar: {
          startingShape: 'flat',
          endingShape: 'rounded',
          borderRadius: 2,
          distributed: true,
          horizontal: true,

          dataLabels: {
            position: 'bottom',
          },
        },
      },
      chart: {
        type: 'bar',
        height: 380,
        margin: 0,
        toolbar: {
          show: false,
        }
      },

      colors: [
        '#33b2df',
        '#546E7A',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
        '#f9a3a4',
        '#90ee7e',
        '#f48024',
        '#69d2e7',
      ],
      dataLabels: {
        enabled: false,
        textAnchor: 'start',
        style: {
          colors: ['#fff'],
        },

        offsetX: 0,
        dropShadow: {
          enabled: false,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [
          'Total Count',
          'Yet To Start',
          'Started',
          'Inprogress',
          'Completed'
        ],
      },
    };
  }

  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @ViewChild('clientwise') clientwisePie: ChartComponent | undefined;


  ngOnInit() {
    this.getDashboardAPI()
  }




  reportList=[
    {
      report_Name:"Home",
      is_download:false
    },
    {
      report_Name:"Dashboard Details",
      is_download:true
    },
  ]

  getDashboardAPI()
   {
    if(this.utility.getUserOrg()==="57"){
      this.apiservice.dashboard_offline(this.DashboardData).subscribe((res: any) => {

        this.responseData = res.data;
          if(this.responseData ){

          }else{
            this.responseData = [];
          }
        this.dynamicallyConfigureColumnsFromObject(res.data);
        this.groupingOfflineCount(this.responseData);
       })
    } else {
      this.tabchange(0)
    }
  }

   dashboardDetails(){
    this.apiservice.liveDashboard(this.DashboardData).subscribe((res: any) => {
      if(res && res.data && res.data[0]){
        this.responseData= res.data
        this.groupingCount(this.responseData);
        this.isDownload = "true"
        this.rowData = { data: res.data };
      }else{
        this.responseData = [];
        this.groupingCount(this.responseData);
        this.rowData = { data: this.responseData}
      }

          this.rejected=0
          this.stopped=0
          this.Started=0
          this.accepted=0
          this.paused=0
          this.template=0
          this.created=0
         if(this.utility.getUserDetails().isOrg !== "1"){

          this.apiservice.proctor(this.DashboardData).subscribe((res:any)=>{

            if (res && res.data && res.data[0]){
              res.data.data.forEach((_item:any,_index:any)=>{
                if(_item.status=="rejected"){
                  this.rejected= this.rejected + 1
                }else if(_item.status=="stopped"){
                  this.stopped= this.stopped + 1
                }else if(_item.status=="started"){
                  this.Started= this.Started + 1
                }else if(_item.status=="accepted"){
                  this.accepted= this.accepted + 1
                }else if(_item.status=="paused"){
                  this.paused= this.paused + 1
                }else if(_item.status=="template"){
                  this.template= this.template + 1
                }else if(_item.status=="created"){
                  this.created= this.created + 1
                }
              })
            } else {

            }
            // this.dynamicallyConfigureColumnsFromObject(res)
            //  this.agGrid.api.setRowData(res)

          })
        } else {

        }

  });
   }

   homeDetails(){
    this.apiservice.ScheduleDetails(this.DashboardData).subscribe((res:any)=>{
      if (res && res.data && res.data[0]){
        this.scheduleData = res.data
        this.chartapi()
      } else {

      }
    })
   }
   chartapi(){
     this.apiservice.ChartDetails(this.toolTipData).subscribe((res: any) => {
       if (res && res.data && res.data[0]) {
         this.chartData = res.data
         if( this.chartData[0].overAll && this.chartData[0].overAll[0]){
          this.chartOptions.series[0].data = [
            this.chartData[0]?.overAll[0]?.scheduled ?? 0,
            (this.chartData[0]?.overAll[0]?.scheduled ?? 0) - (this.chartData[0]?.overAll[0]?.started ?? 0),
            this.chartData[0]?.overAll[0]?.started ?? 0,
            this.chartData[0]?.overAll[0]?.Inprogress ?? 0,
            this.chartData[0]?.overAll[0]?.Completed ?? 0
          ];
          this.ovrAllChrt?.updateSeries(this.chartOptions.series);
        } else{
          this.chartOptions.series[0].data = [
            this.chartData[0]?.overAll[0]?.scheduled ?? 0,
            (this.chartData[0]?.overAll[0]?.scheduled ?? 0) - (this.chartData[0]?.overAll[0]?.started ?? 0),
            this.chartData[0]?.overAll[0]?.started ?? 0,
            this.chartData[0]?.overAll[0]?.Inprogress ?? 0,
            this.chartData[0]?.overAll[0]?.Completed ?? 0
          ];
          this.ovrAllChrt?.updateSeries(this.chartOptions.series);
        }
        if( this.chartData[0].client && this.chartData[0].client[0]){
          this.clientData = this.chartData[0]?.client
        } else {
          this.clientData = []
        }
        if(this.chartData[0].test && this.chartData[0].test[0]){
          this.testData = this.chartData[0]?.test
        } else {
          this.testData = []
        }

        this.testData = this.chartData[0]?.test
         // }, 1000);
       } else {
        this.ovrAllChrt?.updateSeries([]);
        this.clientData = []
        this.testData = []
       }
     })
   }

   groupingCount(_data:any){
    this.batchCount = _data.length;
    let keys = [
      'Total_Count',
      'Started',
      'Terminated',
      'Completed',
      'Inprogress',
      'Yet_To_Start',
    ];
    let domainSum = 0;
    _data.forEach((_item: any) => {
      if (_item.Domain_Name) {
        domainSum = domainSum + 1;
      }
    });
    this.domainCount = domainSum;
    const arrayUniqueByKey = [...new Map(_data.map((item:any) =>[item['Venue_Id'], item])).values()];
    this.venueCount = arrayUniqueByKey.length;

    let results:any = _.zipObject(
      keys,
      keys.map((key) => _.sum(_.map(_data, key)))
    );
    this.total = results;
   }

   groupingOfflineCount(_data:any){
    this.batchCount = _data.length;
    let keys = [
      'Scheduled_Count',
      'Force_Submit',
      'Started',
      'Completed',
      'In_Progress',
      'Yet_to_Start',
    ];
    let batchSum = 0;
    _data.forEach((_item: any) => {
      if (_item.Schedule_Name) {
        batchSum = batchSum + 1;
      }
    });
    this.batchCount = batchSum;
    const arrayUniqueByKey = [...new Map(_data.map((item:any) =>[item['Venue_Code'], item])).values()];
    this.venueCount = arrayUniqueByKey.length;

    let results:any = _.zipObject(
      keys,
      keys.map((key) => _.sum(_.map(_data, key)))
    );


    this.total = results;
    this.CountDetails = {
      idle: this.total.Idle,
      terminate: this.total.Force_Submit,
    };

   }


  getChart(_data: any) {



    this.groupingCount(_data);

    this.CountDetails = {
      idle: this.total.Idle,
      terminate: this.total.Terminated,
    };

    this.chartOptions.series[0].data = [
      this.total.Total_Count,
      this.total.Started,
      this.total.Terminated?this.total.Terminated:0,
      this.total.Idle?this.total.Idle:0,
      this.total.Completed,
      this.total.Inprogrss,
      this.total.Yet_To_Start,
    ];
    setTimeout(() => {
      this.ovrAllChrt?.updateSeries(this.chartOptions.series);
    }, 1000);

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
  }
  groupingdata(data: any) {


    this.chartOptions4.series = [];
    const data$ = from(data);
    let datarray = new Array();

    data$
      .pipe(
        groupBy((item: any) => `${item?.Domain_Name}`),
        mergeMap((group) => group.pipe(toArray()))
      )
      .subscribe((groupedData) => {
        let domainData = {
          name: groupedData[0]?.Domain_Name,
          type: 'column',
          data: Array(),
        };
        groupedData.forEach((gdata) => {
          if (!gdata.Total_Count) {
            gdata.Total_Count = 0;
          }
          domainData.data.push(gdata?.Total_Count);
        });
      })
  }

  daterrange(event:any){

    if (event.length==2) {
      let dateparams = {
        startdate: event ? moment(event[0]).format('yyyy-MM-DD HH:mm') : '',
        enddate: event ? moment(event[1]).format('yyyy-MM-DD HH:mm') : '',
      };
      this.DashboardData = dateparams;
      if (this.utility.getUserOrg()==="57"){
        this.getDashboardAPI()
      } else {
        this.dashboardDetails();
      }
    }
  }
  onSelectionChange(event: any) {
    const selectedValue = event.value;
    this.toolTipData = {"event": event.value}
    this.chartapi()
  }
  livebtn() {
    if(this.liveData)
    {
      this.socketService.getDashboardData()
    }else{
      this.socket_subs.unsubscribe()
      this.socketService.socketOff();
    }
  }

tabchange(index:any){
  this.currentTabIndex =index;
  this.rowData = []
  this.reportList.forEach((tab,i) => {
    if (index === i) {
      if (index === 0) {
        this.homeDetails()
      } else if (index === 1) {
        this.dashboardDetails()
      }
    }

  });
}


  excelexport(params: any) {
    this.excelService.exportAsExcelFile(params, 'report');
  }
}
