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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { AppConfigService } from 'src/app/utils/app-config.service';

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
    imports: [CommonModule, NzDatePickerModule, ReactiveFormsModule, FormsModule, TinycardComponent, NgApexchartsModule, MatButtonModule, MatIconModule, AgGridModule, MatCardModule]
})
export class DashboardComponent implements OnInit {
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
  chart2series: any;
  chart2label: any;
  countByDriveName: any;
  CountDetails: { idle: any; terminate: any } | undefined;
  date7: Date[] = [];
  DashboardData: any;
  socket_subs: any;
  venueCount: number = 0;

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
          'Started',
          'Terminated',
          'Idle',
          'Completed',
          'Inprogress',
          'Yet To Start',
        ],
      },
    };

    this.chartOptions2 = {
      series: [],
      colors: [
        '#65c15f',
        '#00bc94',
        '#69bb46',
        '#00bdd2',
        '#C6E7E3',
        '#219EBC',
      ],
      legend: {
        show: true,
        position: 'bottom',
      },
      chart: {
        type: 'donut',
        width: 450,
        height: 500,

        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: true,
          },
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
          },
        },
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
           
            tooltip: {
              enabled: true,
            },
          },
        },
      ],
    };

    this.chartOptions3 = {
      series: [],
      colors: [
        '#65c15f',
        '#00bc94',
        '#69bb46',
        '#00bdd2',
        '#C6E7E3',
        '#219EBC',
      ],
      chart: {
        type: 'pie',
        width: 450,
      },
      labels: [],
      dataLabels: {
        enabled: true,
      },
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.chartOptions4 = {
      series: [],
      chart: {
        height: 350,
        type: 'bar',
        stacked: false,
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },

      xaxis: {
        categories: Array(),
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              color: '#008FFB',
            },
          },

          tooltip: {
            enabled: true,
          },
        },
      ],
     
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    this.chartOptions5 = {
      series: [],
      colors: ['#65c15f', '#00bc94', '#00bdd2', '#C6E7E3', '#219EBC'],
      chart: {
        type: 'donut',
        width: 450,
        height: 500,
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          zoom: {
            enabled: true,
          },
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
          },
        },
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
    
            tooltip: {
              enabled: true,
            },
          },
        },
      ],
    };
  }
  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  @ViewChild('clientwise') clientwisePie: ChartComponent | undefined;

  ngOnInit() {

    this.getDashboardAPI();
    this.getDashboardSocket();
  }

  getDashboardSocket(){
     this.socket_subs = this.socketService.dashboardData.subscribe((data)=>{
      this.dynamicallyConfigureColumnsFromObject(data);
      this.groupingdata(data);
      this.clientWiseChartDataSort(data);
      this.domainWiseChartDataSort(data);
      this.clientwisedrivedata(data);
      this.getChart(data);
    })
  }

  getDashboardAPI() 
   {
    if(this.utility.getUserOrg()===57){
      this.apiservice.dashboard_offline(this.DashboardData).subscribe((res: any) => { 
        this.responseData = res.data.length;
          if(this.responseData ){
            
          }else{
            this.responseData = "";
          }
        this.dynamicallyConfigureColumnsFromObject(res.data); 
        this.groupingCount(res.data); 
       })
    }
    else{
      this.apiservice.dashboard(this.DashboardData).subscribe((res: any) => {  
      
          this.responseData = res.data.length;
          if(this.responseData ){
            
          }else{
            this.responseData = "";
          }
        this.dynamicallyConfigureColumnsFromObject(res.data); 
        this.groupingdata(res.data);
        this.domainWiseChartDataSort(res.data);
        this.clientwisedrivedata(res.data);
        this.clientWiseChartDataSort(res.data);
        this.getChart(res.data); 
    });
    }
    
   }
   groupingCount(_data:any){
    this.batchCount = _data.length;
    let keys = [
      'Total_Count',
      'Started',
      'Terminated',
      'Idle',
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

  chartdataUpdate() {
    clearTimeout(this.timeoutval);
    this.timeoutval = setTimeout(() => {
      if (this.sparkline.length >= 10) {
        this.sparkline.shift();
      }
      this.sparkline.push(Math.floor(Math.random() * 50));
      this.chartdataUpdate();
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
        groupedData.forEach((cData) => {
          if (cData.Client_Name == null) {
            cData.Client_Name = 'Not Available';
          }
          
          if (
            !datarray.includes(cData.Client_Name)
          ) {
            datarray.push(cData.Client_Name);
          }
        });
        this.chartOptions4.series.push(domainData);
        console.log(domainData,'series');
        
        
      });
      setTimeout(() => {
        
        this.chartOptions4.xaxis.categories = datarray;
        
        this.chart4?.updateOptions(this.chartOptions4);
      }, 1000);
      
  }
  clientWiseChartDataSort(_data: any) {
    
    this.countByClientName = {};
    _data.forEach((_item: any) => {
      if (!this.countByClientName[_item.Client_Name]) {
        this.countByClientName[_item.Client_Name] = 0;
      }
      this.countByClientName[_item.Client_Name] += _item.Total_Count;
    });
    this.chart2label = Object.keys(this.countByClientName);
    this.chart2series = Object.values(this.countByClientName);
    this.chartOptions2.labels = [];
    this.chart2label.forEach((items: any) => {
      this.chartOptions2.labels.push(items);
    });
    this.chartOptions2.series = [];
    this.chart2series.forEach((items: any) => {
      this.chartOptions2.series.push(items);
      this.clientwisePie?.updateSeries(this.chartOptions2.series);
    });
    this.clientwisePie?.updateOptions(this.chartOptions2);  
}

  domainWiseChartDataSort(_data: any) {
  
    let domainwise: any = {};
    _data.forEach((_item: any) => {
      if (!domainwise[_item.Domain_Name]) {
        domainwise[_item.Domain_Name] = 0;
      }
      domainwise[_item.Domain_Name] += _item.Total_Count;
    });
    let chart3label = Object.keys(domainwise);
    let chart3series = Object.values(domainwise);
    this.chartOptions3.labels = [];
    chart3label.forEach((items: any) => {
      this.chartOptions3.labels.push(items);
    });
    this.chartOptions3.series = [];
    chart3series.forEach((items: any) => {
      this.chartOptions3.series.push(items);
      this.chart3?.updateOptions(this.chartOptions3);
    });
}

  clientwisedrivedata(_data: any) {
    
      this.countByDriveName = {};
    _data.forEach((_item: any) => {
      if (!this.countByDriveName[_item.Client_Name]) {
        this.countByDriveName[_item.Client_Name] = 1;
      } else {
        this.countByDriveName[_item.Client_Name] += 1;
      }
    });
    let chart5label = Object.keys(this.countByDriveName);
    let chart5series = Object.values(this.countByDriveName);
    this.chartOptions5.labels = [];
    chart5label.forEach((items: any) => {
      this.chartOptions5?.labels.push(items);
    });
    this.chartOptions5.series = [];
    chart5series.forEach((items: any) => {
      this.chartOptions5?.series.push(items);
      this.chart5?.updateSeries(this.chartOptions5.series);
    });
    this.chart5?.updateOptions(this.chartOptions5);

    }

  daterrange(event:any) {
   
    if (event.length==2) {
      console.log('datata', moment(event[0]).format('yyyy-MM-DD HH:mm'));
      let dateparams = {
        startdate: event ? moment(event[0]).format('yyyy-MM-DD HH:mm') : '',
        enddate: event ? moment(event[1]).format('yyyy-MM-DD HH:mm') : '',
      };
      this.DashboardData = dateparams;
      this.getDashboardAPI();
      console.log('dateparams', dateparams);
    }
  }
  livebtn() {
    if(this.liveData)
    {
      this.socketService.getDashboardData()
      this.getDashboardSocket();
    }else{
      this.socket_subs.unsubscribe()
      this.socketService.socketOff();
      this.getDashboardAPI();
    }
  }

  excelexport(params: any) {
    this.excelService.exportAsExcelFile(params, 'report');
  }
}
