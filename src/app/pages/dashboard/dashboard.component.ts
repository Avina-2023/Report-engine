import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { AgGridAngular } from 'ag-grid-angular';



import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexTheme
} from "ng-apexcharts";
import { ColDef } from 'ag-grid-community';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  theme: ApexTheme;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rowData:any;
  ColDef: any;
  public columnDefs: ColDef[] = []
  @ViewChild("chart") chart ?: ChartComponent;
  public chartOptions: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public data= [
    {
       "Client_Name": "Domain Assessments",
       "Domain_Name": "Domain Assessments",
       "Delivery_Start_Time": "2023-02-24 11:10",
       "Delivery_End_Time": "2023-02-24 11:10",
       "Test_Name": "Aptitude & Domain Assessments_check",
       "Total_Count": 3,
       "Started": 0,
       "Yet_To_Start": 3,
       "Completed": 1,
       "Inprogrss": 0,
       "Idle": 0,
       "Terminated": 0,
       "Only_Instruction": 0,
       "Viewed_1st_Question": 0,
       "Viewed_More_Question": 0,
       "Result_Processed": 0,
       "Result_Inprocess": 0,
       "Result_Not_processed": 3
      },
      {
       "Client_Name": "Aptitude & Domain Assessments",
       "Domain_Name": "Aptitude & Domain Assessments",
       "Delivery_Start_Time": "2023-02-24 11:10",
       "Delivery_End_Time": "2023-02-24 11:10",
       "Test_Name": "Aptitude & Domain Assessments_Section Check",
       "Total_Count": 3,
       "Started": 0,
       "Yet_To_Start": 3,
       "Completed": 0,
       "Inprogrss": 0,
       "Idle": 0,
       "Terminated": 0,
       "Only_Instruction": 0,
       "Viewed_1st_Question": 0,
       "Viewed_More_Question": 0,
       "Result_Processed": 0,
       "Result_Inprocess": 0,
       "Result_Not_processed": 3
       },
       {
       "Client_Name": "EDT",
       "Domain_Name": "LOADTEST",
       "Delivery_Start_Time": "2023-02-24 11:10",
       "Delivery_End_Time": "2023-02-24 11:10",
       "Test_Name": "Aptitude & Domain Assessments_120",
       "Total_Count": 100,
       "Started": 0,
       "Yet_To_Start": 100,
       "Completed": 0,
       "Inprogrss": 0,
       "Idle": 0,
       "Terminated": 0,
       "Only_Instruction": 0,
       "Viewed_1st_Question": 0,
       "Viewed_More_Question": 0,
       "Result_Processed": 0,
       "Result_Inprocess": 0,
       "Result_Not_processed": 100
       }
  ];
  public data1 =[];
total: any;
total2:any;
  myvar = "newvar"
  iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/Html/loader.html');
  items = [
    {
      name: "g"
    },
    {
      name: "a"
    },
    {
      name: "v"
    }
  ]

  error: any;
  onewayTP = true
  @ViewChild('kibona') iframe: ElementRef | undefined;
  
  html: any;
  htmlfile = '../../../assets/Html/maintanence.html'

  eulaContent: any;
  timeoutval:any
  sparkline: any = [0];
  totalscheduledCount: any;
  loggedinCandidates: any;
  testinProgress:any;
  testCompleted: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private apiservice: ApiService) {


  this.chartOptions = {
  series: [
    {
      name: "basic",
      data: [ 30, 45, 40, 23, 80, 56, 53, 106 ]
    }
  ],
  chart: {
    type: "bar",
    //width: 550,

    toolbar: {
      show: true,
      offsetX: 0,
        offsetY: 0,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
      }
    }


  },
  title: {
    text: "Overall Test Status",
    align: "left",
    offsetX: 110
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [

      "Result_Processed",
      "Viewed_1st_Question",
      "Idle",
      "Inprogress",
      "Completed",
      "Yet_To_Start",
      "Started",
      "Total_Count"
    ]
  },
  

  tooltip: {
    fixed: {
      enabled: true,
      position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
      offsetY: 30,
      offsetX: 60
    }
  },
};

this.chartOptions2 = {
  series: [106, 53, 56, 80, 23],
  chart: {
    type: "donut",
    width: 400,

    toolbar: {
      show: true,
      offsetX: 0,
        offsetY: 0,
        zoom: {
          enabled: true,
        },
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
      }
    }

  },
  title: {
    text: "Clients",
    align: "left",
    offsetX: 110
  },
  
  labels: ["Total_Count", "Started", "Yet_To_Start", "Inprogress", "Completed"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        // chart: {
        //   width: 10
        // },
        legend: {
          position: "bottom"
        },
        tooltip: {
          enabled: true
        }
      }
    }
  ]
};

this.chartOptions3 = {
  series: [25, 15, 44, 55, 41, 17],
  chart: {
    type: "pie",
    width:400,
  },
  labels: [
    "College A",
    "College B",
    "College C",
    "College D",
    "College E",
    "College F"
  ],
  theme: {
    monochrome: {
      enabled: true
    }
  },
  title: {
    text: "College Wise",
    align: "left",
    offsetX: 110
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          //width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

this.chartOptions4 = {
  series: [
    {
      name: "Income",
      type: "column",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    },
    {
      name: "Cashflow",
      type: "column",
      data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    },
    {
      name: "Revenue",
      type: "line",
      data: [20, 29, 37, 36, 44, 45, 50, 58]
    }
  ],
  chart: {
    width: 750,
    height: 300,
    type: "line",
    stacked: false
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [1, 1, 4]
  },
  title: {
    text: "Client wise Domain wise Candidates",
    align: "left",
    offsetX: 110
  },
  xaxis: {
    categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
  },
  yaxis: [
    {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#008FFB"
      },
      labels: {
        style: {
          color: "#008FFB"
        }
      },
      title: {
        text: "Income (thousand crores)",
        style: {
          color: "#008FFB"
        }
      },
      tooltip: {
        enabled: true
      }
    },
    {
      seriesName: "Income",
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#00E396"
      },
      labels: {
        style: {
          color: "#00E396"
        }
      },
      title: {
        text: "Operating Cashflow (thousand crores)",
        style: {
          color: "#00E396"
        }
      }
    },
    {
      seriesName: "Revenue",
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FEB019"
      },
      labels: {
        style: {
          color: "#FEB019"
        }
      },
      title: {
        text: "Revenue (thousand crores)",
        style: {
          color: "#FEB019"
        }
      }
    }
  ],
  // tooltip: {
  //   fixed: {
  //     enabled: true,
  //     position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
  //     offsetY: 30,
  //     offsetX: 60
  //   }
  // },
  legend: {
    horizontalAlign: "left",
    offsetX: 40
  }
};

  }

  ngOnInit() {
    // this.kibonacheck(environment.kibana_url);
    // this.chartdataUpdate()
      // console.log(this.data);
    this.gettestData();
   // this.getchartdata();
//       let sum = 0;
//       for (let i = 0; i < this.data.length; i++) {
//       sum += this.data[i].Total_Count;
// }
  }

  kibonacheck(url:any) {
    this.apiservice.getkibona(url).subscribe(
      data => {
        // this.iframe?.nativeElement.removeAttributeNode("srcdoc")
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error => {

        // this.iframe?.nativeElement.removeAttributeNode("srcdoc")
        if (this.onewayTP) {
          this.onewayTP = false
          this.IframeErrorHandle()
        }
        clearTimeout(this.timeoutval);
          this.timeoutval = setTimeout(() => {
            this.kibonacheck(environment.kibana_url)
          }, 10000);
        this.error = error.error.type;
      }
    );
  }
  IframeErrorHandle() {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.htmlfile)
    this.iframe?.nativeElement.contentWindow.location.replace(this.iframeSrc);
    // setTimeout(() => {  }, 5000);
  }

// get totalValue():number{
//      return this.data.reduce((total, item) => total + item.Total_Count, 0);
// }
// get completedValue():number{
//   return this.data.reduce((total, item) => total + item.Completed, 0);
// }

@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
gettestData(){
  this.apiservice.dashboard(this.data).subscribe((res:any)=>{
    this.rowData = res.data 
    this.dynamicallyConfigureColumnsFromObject(res.data)
    this.agGrid.api.setRowData(res.data)
    console.log('data1',this.data1);
let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Idle', 'Yet_To_Start'];
let results = _.zipObject(keys, keys.map(key => _.sum(_.map(this.data, key))));
this.total = results;
// console.log('this', this.total);
this.totalscheduledCount = this.total.Total_Count;
this.loggedinCandidates = this.total.Started;
this.testinProgress = this.total.Inprogrss;
this.testCompleted = this.total.Completed;
})
}


// chartdataUpdate(){
//   clearTimeout(this.timeoutval);
//           this.timeoutval = setTimeout(() => {
//             if(this.sparkline.length>=10){
//               this.sparkline.shift();
//             }
//             this.sparkline.push(Math.floor(Math.random() * 50))
//             console.log(this.sparkline)
            
//             this.chartdataUpdate()
//           }, 1000);
// }

 dynamicallyConfigureColumnsFromObject(anObject:any){
  if(anObject?.length){
  this.ColDef = this.agGrid.api.getColumnDefs();
  this.ColDef.length=0;
  this.columnDefs=[]
  const keys = Object.keys(anObject[0])
  keys.forEach(key =>
    this.columnDefs.push({field : key,headerName:key.replaceAll('_',' ')})
    );
  this.agGrid.api.setColumnDefs(this.columnDefs);
  this.agGrid.api.setRowData(anObject);
  this.rowData=anObject
}
}

}
