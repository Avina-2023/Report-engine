import { Component, OnInit ,ViewChild} from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
// import 'ag-grid-enterprise';
import { ColDef , RowGroupingDisplayType, SideBarDef  } from 'ag-grid-enterprise';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import * as _ from 'lodash';
import * as moment from 'moment';
import  {mockData}  from "../dashboard_VMSS/vmssdata"
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
    selector: 'app-proctor',
    templateUrl: './proctor.component.html',
    styleUrls: ['./proctor.component.scss'],
    standalone: true,
    imports: [NzDatePickerModule, ReactiveFormsModule, FormsModule, MinidetailscardComponent, AgGridModule]
})
export class ProctorComponent implements OnInit {
  // rowData:any;
  date:any
  dtRange:any
  rejected:any
  stopped:any
  Started:any
  accepted:any
  paused:any
  template:any
  created:any
  rowData:any=[];
  ColDef: any;
  rejectedDate: any;
  constructor(
    private apiservice : ApiService,
    private http: HttpClient,
    private fileserver:FileSaverService,
    private excelService:ExcelService,
  ) { }
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  // public groupRowRenderer = 'agGroupCellRenderer';
  columnDefs: ColDef[] = [
  //   {
  //     // group column name
  //     headerName: 'Group',
  //     // use the group cell render provided by the grid
  //     cellRenderer: 'agGroupCellRenderer',
  //     // informs the grid to display row groups under this column
  //     showRowGroup: true,
  //     filter:false
  // },
  // {
  //   headerName: 'Status',
  //   minWidth: 200,
  //   showRowGroup: 'status',
  //   cellRenderer: 'agGroupCellRenderer',
  // },
    { field: 'scheduleName'},
    { field: 'status' },

    // { field: 'scheduleName',rowGroup: true},
    // { field: 'status' ,rowGroup: true },
    { field: 'useremail', filter: 'agMultiColumnFilter'},
    { field: 'score', filter: 'agMultiColumnFilter' },
    { field: 'duration', filter: 'agMultiColumnFilter',
    cellRenderer: (params:any) => {
      let timeData = moment.duration(params.value,'minutes');
      let hourData= timeData.hours()>1?timeData.hours()+" Hrs":timeData.hours()?timeData.hours()+" Hr":''
      let minData= timeData.minutes()>1?timeData.minutes()+" Mins":timeData.minutes()?timeData.minutes()+" Min":''
      let val = hourData+" "+minData
      return val;
  }

  },
    { field: 'error', filter: 'agMultiColumnFilter'},
    { headerName:"Created At", field: 'date', filter: 'agDateColumnFilter'},
    { field: 'startedAt', filter: 'agDateColumnFilter'},

    // { field: 'browser.name' },
    // { field: 'signedAt', filter: 'agMultiColumnFilter'},

];


 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
   resizable:true,
   editable:false,

 };
 public sideBar: SideBarDef  = {
  toolPanels: ['filters'],
};
 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 // Example load data from sever
//  onGridReady(params: GridReadyEvent) {

//  }

//  // Example of consuming Grid Event
//  onCellClicked( e: CellClickedEvent): void {
//    console.log('cellClicked', e);
//  }
  ngOnInit() {
    let param =  { }
    this.proctordata(param)
  }
  dateChange(event:any) {
    if (event.length==2) {
      let dateparams = {
        startdate: event ? moment(event[0]).toISOString() : '',
        enddate: event ? moment(event[1]).toISOString() : '',
      };
      this.proctordata(dateparams)
    }
  }
  proctordata(dateparams:any){
    this.rejected=0
    this.stopped=0
    this.Started=0
    this.accepted=0
    this.paused=0
    this.template=0
    this.created=0
    this.apiservice.proctor(dateparams).subscribe((res:any)=>{
      this.rowData = res.data.data
      // this.rowData = mockData.data.item;


      this.rowData.forEach((_item:any,_index:any)=>{
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
      // this.dynamicallyConfigureColumnsFromObject(res)
      //  this.agGrid.api.setRowData(res)

    })
  }
  statsCardClick(data:string){
      var sportsFilterComponent = this.agGrid.api.getFilterInstance("status");

      sportsFilterComponent?.setModel({
        type: "contains",
        filter: "paused"
      });
      this.agGrid.api.onFilterChanged();
  }



}
