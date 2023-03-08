import { Component, OnInit ,ViewChild} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
// import 'ag-grid-enterprise';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
@Component({
  selector: 'app-examStatusReport',
  templateUrl: './examStatusReport.component.html',
  styleUrls: ['./examStatusReport.component.scss']
})
export class ExamStatusReportComponent implements OnInit {
  exam = { "date": "",'Client_name':"",'Domain_name':"",'DeliveryStartTime':""};
  userData = { "date": "2023/02/14"};
  datepipe=new DatePipe('en-us')
  datewise:any={}
  obj:any;
  rowData:any=[];
  ColDef: any;
  value:Date[] | undefined;
  date7: Date[] =[new Date(),new Date(new Date().setDate(new Date().getDate() + 1))];

  // colDefs: any=[];
  constructor(
    private apiservice : ApiService,
    private http: HttpClient,
    private fileserver:FileSaverService,
    private excelService:ExcelService,
    private messenger:InterComponentMessenger
  ) {}
 // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = []

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

// Example using Grid's API
clearSelection(): void {
  this.agGrid.api.deselectAll();
}
ngOnInit() {
  let data={
    "startdate":this.datepipe.transform(this.date7[0], 'yyyy-MM-dd'),
    "enddate":this.datepipe.transform(this.date7[1], 'yyyy-MM-dd')
  }
  this.dateWiseSectionReport(data)
}
daterrange(){

   if(this.date7[0] && this.date7[1])
  this.dateWiseSectionReport(this.generateParams())
}
getdata(){
  this.apiservice.dashboard().subscribe((res:any)=>{
    this.rowData = res.data
    this.dynamicallyConfigureColumnsFromObject(res.data)
    this.agGrid.api.setRowData(res.data)
  })
}
generateParams(){
  return{
    "startdate":this.date7?this.datepipe.transform(this.date7[0], 'yyyy-MM-dd h:m'):"",
    "enddate":this.date7?this.datepipe.transform(this.date7[1], 'yyyy-MM-dd h:m'):""
  }
}
dateWiseSectionReport(data:any){
  this.apiservice.dateWiseSectionReport(data).subscribe((res:any)=>{
    this.rowData = res.data
    this.dynamicallyConfigureColumnsFromObject(res.data)
    this.agGrid.api.setRowData(res.data)
  })
}
excelexport(params:any){
  this.excelService.exportAsExcelFile(params, 'report');
}
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
