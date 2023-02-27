import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


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
total: any;
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

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private apiservice: ApiService) {


  this.chartOptions = {  
  series: [
    {
      name: "basic",
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }
  ],
  chart: {
    type: "bar",
    height: 350
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
      "Inprogrss",
      "Completed",
      "Yet_To_Start",
      "Started",
      "Total_Count"
    ]
  }
};

this.chartOptions2 = {
  series: [44, 55, 13, 43, 22],
  chart: {
    type: "donut"
  },
  labels: ["Client A", "Client B", "Client C", "Client D", "Client E"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

this.chartOptions3 = {
  series: [25, 15, 44, 55, 41, 17],
  chart: {
    width: "100%",
    type: "pie"
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
    text: "Number of leads"
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
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
    height: 350,
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
  tooltip: {
    fixed: {
      enabled: true,
      position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
      offsetY: 30,
      offsetX: 60
    }
  },
  legend: {
    horizontalAlign: "left",
    offsetX: 40
  }
};

  }

  ngOnInit() {
    this.kibonacheck(environment.kibana_url);
      console.log(this.data); 
    this.gettestData();
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

gettestData(){
let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Idle', 'Yet_To_Start'];
let results = _.zipObject(keys, keys.map(key => _.sum(_.map(this.data, key))));
this.total = results;
console.log('this', this.total);
}
  
  
  
}
