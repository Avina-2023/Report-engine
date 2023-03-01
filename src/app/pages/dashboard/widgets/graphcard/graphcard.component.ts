import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @ViewChild("realtime") rtChart?: ChartComponent;
  @Input() idleCount: any;
  @Input()sparklineData:any = []
  @Input() cardDescription: any;
  @Input() cardTitle: any = 'Input Text Needed';
  testingValue: any;
  public chartOptions: any;
  currentIdle: any = 0;


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Idle Candidates",
          data: []
        }
      ],
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#25ee6f',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      chart: {
        toolbar: {
          show: false
        },
        type: "line",
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            enabled: true,
            speed: 110
          },
          animateGradually:{
            enabled:true,
          }
        },
        sparkline: {
          enabled: false
        },
        // sparkline: {
        //   enabled: true
        // },
      },

      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
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
          "2018-09-19T07:30:00.000Z",
          "2018-09-19T08:30:00.000Z",
          "2018-09-19T09:30:00.000Z"
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
    //this.getdata();

    setInterval(()=>{
      this.chartOptions.series[0].data = this.sparklineData
      this.currentIdle =this.sparklineData[this.sparklineData.length-1]
      this.rtChart?.updateSeries(this.chartOptions.series,true)
    },1000)

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // this.chartOptions.series[0].data = changes['sparklineData'].currentValue
    // changes.prop contains the old and the new value...
  }

 /* getdata() {
    let keys = ['Total_Count', 'Started', 'Terminated', 'Completed', 'Inprogrss', 'Idle', 'Yet_To_Start'];
    let results = _.zipObject(keys, keys.map(key => _.sum(_.map(this.data, key))))
    this.total = results
    console.log('this', this.total);
  }
  get idle_count() {
    return Math.abs(this.total.Inprogrss - this.total.Completed);
  }*/





}
