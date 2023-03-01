import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-graphcard',
  templateUrl: './graphcard.component.html',
  styleUrls: ['./graphcard.component.scss']
})
export class GraphcardComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: any;
  data = [
    {
      "Client_Name": "Domain Assessments",
      "Domain_Name": "Domain Assessments",
      "Delivery_Start_Time": "2023-02-24 11:10",
      "Delivery_End_Time": "2023-02-24 11:10",
      "Test_Name": "Aptitude & Domain Assessments_check",
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
  testingValue: any;

  constructor() {

    this.chartOptions = {
      series: [
        {
          name: "Idle Candidates",
          data: [131, 70, 98, 151, 112, 169, 10,128]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        type: "area",
        sparkline:{
          enabled: true
        },
      },
      

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          "2018-09-19T07:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

  }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Idle', 'Yet_To_Start'];
    let results = _.zipObject(keys, keys.map(key => _.sum(_.map(this.data, key))))
    this.total = results
    console.log('this', this.total);
  }
  get idle_count() {
    return Math.abs(this.total.Inprogrss - this.total.Completed);
  }





}
