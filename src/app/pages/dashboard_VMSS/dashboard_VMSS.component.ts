import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef , RowGroupingDisplayType,  } from 'ag-grid-enterprise';
import { AgGridAngular } from 'ag-grid-angular';
import { ChartComponent } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excelService';
import  {mockData}  from "./vmssdata"
@Component({
  selector: 'app-dashboard_VMSS',
  templateUrl: './dashboard_VMSS.component.html',
  styleUrls: ['./dashboard_VMSS.component.scss']
})
export class Dashboard_VMSSComponent implements OnInit {
  @ViewChild('ovrAllChrt') ovrAllChrt?: ChartComponent;
  @ViewChild('timelineChrt') timelineChrt?: ChartComponent;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public groupDisplayType: RowGroupingDisplayType = 'custom';
  public groupRowRenderer = 'agGroupCellRenderer';
  vmssData: any;
  chartOptions:any = {
    series: [
      {
        name: 'Total',
        data: [34,74,53,32],
      },
      {
        name: 'Started',
        data: [14,64,26,23],
      },
      {
        name: 'In-progress',
        data: [4,84,16,45],
      },
      {
        name: 'Completed',
        data: [24,74,56,22],
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
    },

    colors: [
      '#33b2df',
      '#546E7A',
      '#d4526e',
      '#13d8aa',

    ],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
      // formatter: function (val:any, opt:any) {
      //   return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      // },
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
        'doapp 1',
        'doapp 2',
        'doapp 3',
        'doapp 4',
      ],
    },
  };
  chrtTimeline:any={
    series: [
    {
      name: 'Bob',
      data: [
        {
          x: 'Design',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-08').getTime()
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-02').getTime(),
            new Date('2019-03-05').getTime()
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-07').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-03').getTime(),
            new Date('2019-03-09').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-08').getTime(),
            new Date('2019-03-11').getTime()
          ]
        },
        {
          x: 'Validation',
          y: [
            new Date('2019-03-11').getTime(),
            new Date('2019-03-16').getTime()
          ]
        },
        {
          x: 'Design',
          y: [
            new Date('2019-03-01').getTime(),
            new Date('2019-03-03').getTime()
          ],
        }
      ]
    },
    {
      name: 'Joe',
      data: [
        {
          x: 'Design',
          y: [
            new Date('2019-03-02').getTime(),
            new Date('2019-03-05').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-06').getTime(),
            new Date('2019-03-16').getTime()
          ],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-10').getTime(),
              strokeColor: '#CD2F2A'
            }
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-03').getTime(),
            new Date('2019-03-07').getTime()
          ]
        },
        {
          x: 'Deployment',
          y: [
            new Date('2019-03-20').getTime(),
            new Date('2019-03-22').getTime()
          ]
        },
        {
          x: 'Design',
          y: [
            new Date('2019-03-10').getTime(),
            new Date('2019-03-16').getTime()
          ]
        }
      ]
    },
    {
      name: 'Dan',
      data: [
        {
          x: 'Code',
          y: [
            new Date('2019-03-10').getTime(),
            new Date('2019-03-17').getTime()
          ]
        },
        {
          x: 'Validation',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-09').getTime()
          ],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-07').getTime(),
              strokeColor: '#CD2F2A'
            }
          ]
        },
      ]
    }
  ],
    chart: {
    height: 450,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%'
    }
  },
  xaxis: {
    type: 'datetime'
  },
  stroke: {
    width: 1
  },
  fill: {
    type: 'solid',
    opacity: 0.6
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  }
  };
  public defaultColDef: any = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  };
  rowData: any;
  ColDefn: any;
  columnDefs: any;
  totalInstances: any;
  constructor(private apiService:ApiService, private excelService:ExcelService) { }

  ngOnInit() {
    this.apiService.getVMSSDetails("2023-04-13 11:30:00").subscribe((data:any)=>{
      // let data = mockData;
      console.log(data);
      if(data.success){
        console.log(data.data)
        this.vmssData = data.data;
        this.totalInstances = this.vmssData?.items.length
        this.chartOptions.series[0].data = [
          this.vmssData?.total_count,
          // this.vmssData?.total_started,
          this.vmssData?.total_inprogress,
          this.vmssData?.total_completed,
        ];
        this.ovrAllChrt?.updateSeries(this.chartOptions.series);
        setTimeout(() => {
        this.dynamicallyConfigureColumnsFromObject(this.vmssData.items)
        this.timelineChart(this.vmssData.items)
        const groupedObject = this.vmssData.items.groupBy((item:any) => {
          return item.instance_name;
        });
        console.log(groupedObject)
      }, 500);

      

      }
    })
  }

  timelineChart(timeParam:any){
    var options = this.chrtTimeline;
  }

  dynamicallyConfigureColumnsFromObject(anObject: any) {
    // console.log('anObject',anObject);

    if (anObject?.length) {
      this.ColDefn = this.agGrid.api.getColumnDefs();
      this.ColDefn.length = 0;
      this.columnDefs = [];
      const keys = Object.keys(anObject[0]);
      // console.log('keys',keys);

      keys.forEach((key:any) =>{
       let colDet:any =  {
          field: key,
          headerName: key.replaceAll('_', ' ').replaceAll('Time', 'Date'),
        }
        //THIS IS FOR GROUPING THE TABLE
      // if(key=='instance_name'){
      //   let groupCellData = {
      //     headerName: colDet.headerName,
      //     minWidth: 200,
      //     showRowGroup: key,
      //     cellRenderer: 'agGroupCellRenderer',
      //   }
      //   colDet.rowGroup= true;
      //   colDet.hide= true;
      //   this.columnDefs.push(groupCellData);
        
      // }
        this.columnDefs.push(colDet);
        });
      this.agGrid.api.setColumnDefs(this.columnDefs);
      this.agGrid.api.setRowData(anObject);
      this.rowData=anObject
    }
  }

  excelexport(params: any) {
    this.excelService.exportAsExcelFile(params, 'report');
  }

//   groupBy(array:array, f:function) {
//     let groups = {};
//     array.forEach(function (o) {
//       var group = JSON.stringify(f(o));
//       groups[group] = groups[group] || [];
//       groups[group].push(o);
//     });
//  return Object.keys(groups).map(function (group) {
//    return groups[group];
//  })
// }

}
