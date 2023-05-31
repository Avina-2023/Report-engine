import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
// import 'ag-grid-enterprise';
import { ColDef  } from 'ag-grid-enterprise';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { InterComponentMessenger } from 'src/app/services/interComponentMessenger.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
    selector: 'app-examStatusReport',
    templateUrl: './examStatusReport.component.html',
    styleUrls: ['./examStatusReport.component.scss'],
    standalone: true,
    // encapsulation: ViewEncapsulation.None,
    imports: [NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule, MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule]
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
  date7:any;
  sidenav: any;

  
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

// Example using Grid's API
clearSelection(): void {
  this.agGrid.api.deselectAll();
}
ngOnInit() {
  this.dateWiseSectionReport({})
}
daterrange(event:any){

   if(event.length){
   let param = {
    "startdate":event?this.datepipe.transform(event[0], 'yyyy-MM-dd HH:mm'):"",
    "enddate":event?this.datepipe.transform(event[1], 'yyyy-MM-dd HH:mm'):""
  }
  
  this.dateWiseSectionReport(param)
}
}

clickHandler() {
  this.sidenav.close();
}

// getdata(){
//   this.apiservice.dashboard(this.daterrange).subscribe((res:any)=>{
//     this.rowData = res.data
//     this.dynamicallyConfigureColumnsFromObject(res.data)
//     this.agGrid.api.setRowData(res.data)
//   })
// }
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
  this.ColDef = this.agGrid.api.getColumnDefs();
  this.ColDef.length=0;
  this.columnDefs=[]
  if(anObject?.length){
  
  const keys = Object.keys(anObject[0])
  keys.forEach(key =>
    this.columnDefs.push({field : key,headerName:key.replaceAll('_',' ')})
    );
  
}
this.agGrid.api.setColumnDefs(this.columnDefs);
  this.agGrid.api.setRowData(anObject);
  this.rowData=anObject
}
}
