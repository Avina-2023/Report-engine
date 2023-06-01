import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
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
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';

@Component({
    selector: 'app-examStatusReport',
    templateUrl: './examStatusReport.component.html',
    styleUrls: ['./examStatusReport.component.scss'],
    standalone: true,

    imports: [NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule, MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent],
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
  tabdate:any;
  
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


// Example using Grid's API
// clearSelection(): void {
//   this.agGrid.api.deselectAll();
// }
ngOnInit() {
  this.dateWiseSectionReport({})
  // this.dateWiseitemReport({})
}
daterrange(event:any){

   if(event.length){
    this.tabdate = {
    "startdate":event?this.datepipe.transform(event[0], 'yyyy-MM-dd HH:mm'):"",
    "enddate":event?this.datepipe.transform(event[1], 'yyyy-MM-dd HH:mm'):""
  }
  
   this.dateWiseSectionReport(this.tabdate)
   this.dateWiseitemReport(this.tabdate)
}
}

clickHandler() {
  this.sidenav.close();
}


dateWiseSectionReport(data:any){
  this.apiservice.dateWiseSectionReport(data).subscribe((res:any)=>{
    this.rowData = res.data
    // this.dynamicallyConfigureColumnsFromObject(res.data)
    // this.agGrid.api.setRowData(res.data)
  })
}

dateWiseitemReport(data:any){
  this.apiservice.dateWiseitemReport(data).subscribe((res:any)=>{
    this.rowData = res.data
    // this.dynamicallyConfigureColumnsFromObject(res.data)
    // this.agGrid.api.setRowData(res.data)
  })
}

tabchange(event:any){

  switch(event.index) {
    case 0:
      this.dateWiseSectionReport(this.tabdate)
      console.log(this.rowData)
        break;
    case 1:
      this.dateWiseitemReport(this.tabdate)
      console.log(this.rowData)
        break;
 }
console.log('Index: ' + event.index);
}

// excelexport(params:any){
//   this.excelService.exportAsExcelFile(params, 'report');
// }
// dateWiseitemReport(data:any){
//   this.apiservice.dateWiseitemReport(data).subscribe((res:any)=>{
//     this.rowData = res.data
//     this.dynamicallyConfigureColumnsFromObject(res.data)
//     this.agGrid.api.setRowData(res.data)
//     // console.log(this.dateWiseitemReport)
//   })
// }

// dynamicallyConfigureColumnsFromObject(anObject:any){
//   this.ColDef = this.agGrid.api.getColumnDefs();
//   this.ColDef.length=0;
//   this.columnDefs=[]
//   if(anObject?.length){
  
//   const keys = Object.keys(anObject[0])
//   keys.forEach(key =>
//     this.columnDefs.push({field : key,headerName:key.replaceAll('_',' ')})
//     );
  
// }
// this.agGrid.api.setColumnDefs(this.columnDefs);
//   this.agGrid.api.setRowData(anObject);
//   this.rowData=anObject
// }
}
