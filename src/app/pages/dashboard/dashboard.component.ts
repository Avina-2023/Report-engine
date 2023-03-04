import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
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
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public data = [
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
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable:true,
    editable:false,

  };
  total: any;
  total2: any;
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
  timeoutval: any
  sparkline: any = [0];
  totalscheduledCount: any;
  loggedinCandidates: any;
  testinProgress: any;
  testCompleted: any;
  chartDetails: any;
  batchCount: any;
  domainCount: any;
  domainSum: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private apiservice: ApiService) {



    this.chartOptions = {
      series: [
        {
          name: 'Total',
          data: []
        },
        {
          name: 'Started',
          data: []
        },
        {
          name: 'Terminated',
          data: []
        },
        {
          name: 'Completed',
          data: []
        },
        {
          name: 'Inprogrss',
          data: []
        },
        {
          name: 'Yet To Start',
          data: []
        },
      ],
      colors: ['#65c15f', '#00bc94', '#69bb46', '#00bdd2', '#C6E7E3', '#219EBC'],
      chart: {
        type: "bar",
        width: 450,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'Total', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Yet To Start'
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
      series: [],
      colors: ['#65c15f', '#00bc94', '#69bb46', '#00bdd2', '#C6E7E3', '#219EBC'],
      chart: {
        type: "donut",
        width: 450,
        height: 500,

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
      labels: ['Total', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Yet To Start'],
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
      series: [],
      colors: ['#65c15f', '#00bc94', '#69bb46', '#00bdd2', '#C6E7E3', '#219EBC'],
      chart: {
        type: "pie",
        width: 450,
      },
      labels: ['Total', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Yet To Start'],
      theme: {
        monochrome: {
          enabled: false
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
          name: "domain1",
          type: "column",
          data: [1.4, 2, 2.5]
        },
        {
          name: "domain2",
          type: "column",
          data: [1.1, 3, 3.1]
        },
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
        categories: ['ClientA', 'ClientB', 'ClientC']
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
          // title: {
          //   text: "Income (thousand crores)",
          //   style: {
          //     color: "#008FFB"
          //   }
          // },
          tooltip: {
            enabled: true
          }
        },
        // {
        //   seriesName: "Income",
        //   opposite: true,
        //   axisTicks: {
        //     show: true
        //   },
        //   axisBorder: {
        //     show: true,
        //     color: "#00E396"
        //   },
        //   labels: {
        //     style: {
        //       color: "#00E396"
        //     }
        //   },
        //   title: {
        //     text: "Operating Cashflow (thousand crores)",
        //     style: {
        //       color: "#00E396"
        //     }
        //   }
        // },
        // {
        //   seriesName: "Revenue",
        //   opposite: true,
        //   axisTicks: {
        //     show: true
        //   },
        //   axisBorder: {
        //     show: true,
        //     color: "#FEB019"
        //   },
        //   labels: {
        //     style: {
        //       color: "#FEB019"
        //     }
        //   },
        //   title: {
        //     text: "Revenue (thousand crores)",
        //     style: {
        //       color: "#FEB019"
        //     }
        //   }
        // }
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
  public columnDefs: ColDef[] = []
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit() {
    // this.kibonacheck(environment.kibana_url);
    // this.chartdataUpdate()
    console.log(this.data);
    this.gettestData();
    // this.getchartdata();
    //       let sum = 0;
    //       for (let i = 0; i < this.data.length; i++) {
    //       sum += this.data[i].Total_Count;
    // }
  }
  getdata() {
    // this.apiservice.dashboard().subscribe((res: any) => {
    //   console.log(res.data);
    //      let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Idle', 'Yet_To_Start'];
    //   let results = _.zipObject(keys, keys.map(key => _.sum(_.map(res.data, key))))
    //   console.log(results);
    //      this.total = results
    //      this.chartDetails=results
    //  this.getChart(this.chartDetails)

    // })
  }

  kibonacheck(url: any) {
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

  gettestData() {
    this.apiservice.dashboard().subscribe((res: any) => {
      this.batchCount = res.data.length
      console.log('res.data',res.data);
      setTimeout(() => {
        this.dynamicallyConfigureColumnsFromObject(res.data)
        // this.agGrid.api.setRowData(res.data)
      }, 1000);

      let domainSum = 0
      res.data.forEach((_item: any) => {
        if (_item.Domain_Name) {
          domainSum = domainSum + 1
        }

      })
      this.domainCount = domainSum
      let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Yet_To_Start'];
      let results = _.zipObject(keys, keys.map(key => _.sum(_.map(res.data, key))));
      this.total = results;
      console.log('this', this.total);
      this.getChart(this.total)

    })
  }
  getChart(_data: any) {
    console.log('_data', _data);

    this.chartOptions.series[0].data = [_data.Total_Count, _data.Started, _data.Terminated, _data.Completed, _data.Inprogrss, _data.Yet_To_Start]
    this.chartOptions2.series = [_data.Total_Count, _data.Started, _data.Terminated, _data.Completed, _data.Inprogrss, _data.Yet_To_Start]
    this.chartOptions3.series = [_data.Total_Count, _data.Started, _data.Terminated, _data.Completed, _data.Inprogrss, _data.Yet_To_Start]
    //this.chartOptions1.series[0].data = [_data.Total_Count,_data.Started, _data.Terminated, _data.Completed, _data.Inprogrss, _data.Yet_To_Start]
    console.log('this.chartOptions.series[0].data', this.chartOptions.series[0].data);
    console.log('this.chartOptions2.series', this.chartOptions2.series);

    // this.chartOptions1.series[0].data = [this.total.Total_Count, this.total.Started, this.total.Terminated, this.total.Completed, this.total.Inprogrss, this.total.Yet_To_Start]
  }

  chartdataUpdate() {
    clearTimeout(this.timeoutval);
    this.timeoutval = setTimeout(() => {
      if (this.sparkline.length >= 10) {
        this.sparkline.shift();
      }
      this.sparkline.push(Math.floor(Math.random() * 50))
      console.log(this.sparkline)

      this.chartdataUpdate()
    }, 1000);
  }
  dynamicallyConfigureColumnsFromObject(anObject:any){
    console.log('anObject',anObject);

    if(anObject?.length){
    this.ColDef = this.agGrid.api.getColumnDefs();
    this.ColDef.length=0;
    this.columnDefs=[]
    const keys = Object.keys(anObject[0])
    console.log('keys',keys);

    keys.forEach(key =>
      this.columnDefs.push({field : key,headerName:key.replaceAll('_',' ')})
      );
    this.agGrid.api.setColumnDefs(this.columnDefs);
    this.agGrid.api.setRowData(anObject);
    // this.rowData=anObject
  }
  }
}
