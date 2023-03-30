import { Component, OnInit ,ViewChild} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
// import 'ag-grid-enterprise';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-proctor',
  templateUrl: './proctor.component.html',
  styleUrls: ['./proctor.component.css']
})
export class ProctorComponent implements OnInit {
  // rowData:any;
  date:any
  rejected:any
  stopped:any
  Started:any
  accepted:any
  paused:any
  template:any
  created:any
  // ColDef: any;
  rowData:any=[];
  ColDef: any;
  rejectedDate: any;
  constructor(
    private apiservice : ApiService,
    private http: HttpClient,
    private fileserver:FileSaverService,
    private excelService:ExcelService,
  ) { }

  columnDefs: ColDef[] = [
    { field: 'scheduleName' },
    { field: 'useremail' },
    { field: 'status' },
    { field: 'browser' },
    { field: 'signedAt' },
    { field: 'createdAt' }
];





 // Each Column Definition results in one Column.
//  public columnDefs: ColDef[] = []

 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
   resizable:true,
   editable:false,
 
 };
 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
 
 }
 
 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }
  ngOnInit() {
    this.proctordata()
  }
  proctordata(){
    this.rejected=0
    this.stopped=0
    this.Started=0
    this.accepted=0
    this.paused=0
    this.template=0
    this.created=0
    this.apiservice.proctor(this.date).subscribe((res:any)=>{
      console.log(res);
      this.rowData = res
      res.forEach((_item:any,_index:any)=>{
        if(_item.status=="rejected"){
          this.rejected= this.rejected + 1
        }else if(_item.status=="stopped"){
          this.stopped= this.stopped + 1
        }else if(_item.status=="Started"){
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
      console.log(this.rejectedDate);

    })
  }

}
