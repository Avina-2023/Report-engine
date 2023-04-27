import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef , RowGroupingDisplayType,  } from 'ag-grid-enterprise';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api.service';
import { ExcelService } from 'src/app/services/excelService';
import  {mockData}  from "./vmssdata"
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DetailscardComponent } from '../detailscard/detailscard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
@Component({
    selector: 'app-dashboard_VMSS',
    templateUrl: './dashboard_VMSS.component.html',
    styleUrls: ['./dashboard_VMSS.component.scss'],
    providers: [DatePipe],
    standalone: true,
    imports: [NzDatePickerModule, ReactiveFormsModule, FormsModule, DetailscardComponent, MatCardModule, NgApexchartsModule, MatButtonModule, MatIconModule, AgGridModule]
})
export class Dashboard_VMSSComponent implements OnInit {
  @ViewChild('ovrAllChrt') ovrAllChrt?: ChartComponent;
  @ViewChild('timelineChrt') timelineChrt?: ChartComponent;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public groupDisplayType: RowGroupingDisplayType = 'custom';
  public groupRowRenderer = 'agGroupCellRenderer';
  vmssData: any;
  selectedDate: any;
  chartOptions:any = {
    series: [],
    plotOptions: {
      bar: {
        startingShape: 'flat',
        endingShape: 'rounded',
        borderRadius: 2,
        distributed: false,
        horizontal: false,

        dataLabels: {
          total: {
            enabled: true,
          },
          position: 'bottom',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false
    },

    chart: {
      type: 'bar',
      stacked: true,
      height:'350px' ,
      margin: 0,
    },

   
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
      categories: [],
    },
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
  constructor(private apiService:ApiService, private excelService:ExcelService,private datePipe: DatePipe) { }

  ngOnInit() {

    this.getVmssData(new Date())
  }

  getVmssData(data:Date){
    let dateStr = this.datePipe.transform(data,"YYYY-MM-dd")//data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate();
    let timeStr = this.datePipe.transform(data,"HH:mm")
    let vmssParam = {
        "date":dateStr,
        "time":timeStr
    }
    this.apiService.getVMSSDetails(vmssParam).subscribe((data:any)=>{
      // let data = mockData;
      if(data.success){
        this.vmssData = data?.data?data?.data:data.data.item=[];
        //CHART DATA USING MAP
        let cdata:any;
        let instData:any;
        if(this.vmssData?.items){
         cdata = [
        //   {
        //   name: 'Total',
        //   data: this.vmssData?.items?.map((dat:any) => {
        //     return dat.Totalcount;
        //   }),
        // },
        // {
        //   name: 'Yet to Start',  
        //   data: this.vmssData?.items?.map((dat:any) => {
        //     return dat.yetostart;
        //   }),
        // },
        {
          name: 'In-progress',
          data: this.vmssData?.items?.map((dat:any) => {
            return dat.inprogress;
          }),
        },
        {
          name: 'Completed',
          data: this.vmssData?.items?.map((dat:any) => {
            return dat.completed;
          }),
        }];
        //INSTANCE GROUPING DATA
         instData = {
          xaxis: {
          type: "category",
          categories: this.vmssData?.items?.map((i:any) =>{return i.instance_name})
          }};
        }else{
          cdata = [
            // {
            //   name: 'Yet to Start',  
            //   data: [],
            // },
            {
              name: 'In-progress',
              data: []
            },
            {
              name: 'Completed',
              data: []
            }
          ];
          instData = {
            xaxis: {
              type: "category",
              categories: []
              },
            noData: {
              text: 'No Data Available',
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 0,
              offsetY: 0,
              style: {
                color: 'red',
                fontSize: '14px',
                fontFamily: undefined
              }
            }
          }
        }
          setTimeout(() => {
            console.log(cdata)
        this.ovrAllChrt?.updateSeries(cdata);
        this.ovrAllChrt?.updateOptions(instData);
        
        this.dynamicallyConfigureColumnsFromObject(this.vmssData?.items)
        // this.timelineChart(this.vmssData.items)
        // const groupedObject = this.vmssData.items.groupBy((item:any) => {
        //   return item.instance_name;
        // });
      }, 500);

      

      }
    })
  }
  onChange(event: Date){
    this.getVmssData(event)
  }

  dynamicallyConfigureColumnsFromObject(anObject: any) {
    console.log(anObject)
    this.ColDefn = this.agGrid.api.getColumnDefs();
    this.ColDefn.length = 0;
    this.columnDefs = [];

    if (anObject?.length) {
     
      const keys = Object.keys(anObject[0]);

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
    }else{
      this.agGrid.api.setColumnDefs(this.columnDefs);
      this.agGrid.api.setRowData([]);
      this.rowData=[]
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
