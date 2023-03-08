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
import { Renderer2 } from '@angular/core';

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
  @Input() cardTitle: any;
  @Input() dataLabel1: String = '######';
  @Input() data1: Number = 0;
  @Input() dataLabel2: String = '######';
  @Input() data2: Number = 0;
  @Input() dataLabel3: String= '######';
  @Input() data3: Number = 0;
  @Input() cardColor:String = "#300";
  testingValue: any;
  public chartOptions: any;
  currentIdle: any = 0;


  constructor(private renderer: Renderer2) {
    this.chartOptions = {
      series: [
        {
          name: "Idle Candidates",
          data: []
        }
      ],
      colors:[this.cardColor],

      chart: {
        toolbar: {
          show: false
        },
        type: "line",
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed:800,
          // dynamicAnimation: {
          //   enabled: true,
          //   speed: 110
          // },
          animateGradually:{
            enabled:true,
            delay:100
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
    //style color variable setting
    // getComputedStyle(document.documentElement).setProperty('--graphcard-color',this.cardColor.toString());
    // this.renderer.setProperty(document.body, '--graphcard', this.cardColor.toString());
    // this.renderer.setStyle(document.getElementsByClassName('bottom_bar'), 'background',this.cardColor.toString())
    // document.documentElement.style.setProperty('--graphcard', this.cardColor.toString());
    // document.getElementsByClassName('bottom_bar')
    this.chartOptions.colors[0] = this.cardColor.toString()
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


