import { Component, OnInit ,ViewChild} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
// import 'ag-grid-enterprise';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
@Component({
  selector: 'app-examStatusReport',
  templateUrl: './examStatusReport.component.html',
  styleUrls: ['./examStatusReport.component.scss']
})
export class ExamStatusReportComponent implements OnInit {
  exam = { "date": "",'Client_name':"",'Domain_name':"",'DeliveryStartTime':""};
  obj:any;
  rowData:any=[];
  constructor(
    private apiservice : ApiService,
    private http: HttpClient,
    private fileserver:FileSaverService,
    private excelService:ExcelService
  ) { }
 // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {
      headerName: 'Client Name',
      width: 200,
      minWidth: 120,
      field: 'Client_name'
    },
    {
      headerName: 'Domain Name',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Domain_name'
    },
    {
      headerName: 'Delivery Label',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'DeliveryLabel'
    },
    {
      headerName: 'Delivery Start Time',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'DeliveryStartTime'
    },
    {
      headerName: 'Delivery End Time',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'DeliveryEndTime'
    },
    {
      headerName: 'Yet to Start',
      width: 50,
      minWidth: 120,
      sortable: true,
      field: 'Yettostart'
    },
    {
      headerName: 'Test Name',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Testname'
    },
    {
      headerName: 'Completed',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Completed'
    },
    {
      headerName: 'Inprogress',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Inprogress'
    },
    {
      headerName: 'Terminated',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Terminated'
    },
    {
      headerName: 'Attended Instruction',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Attended_Instruction'
    },
    {
      headerName: 'Viewed Instruction',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Viewed_Instruction'
    },
    {
      headerName: 'Results Processed',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Results_Processed'
    },
    {
      headerName: 'Results Inprogress',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Results_Inprogress'
    },
    {
      headerName: 'Results Not Processed',
      width: 130,
      minWidth: 120,
      sortable: true,
      field: 'Results_Not_Processed'
    }
  ];

// DefaultColDef sets props common to all Columns
public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable:true,
  editable:true,

};
// For accessing the Grid's API
@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
// Example load data from sever
onGridReady(params: GridReadyEvent) {
this.getdata()
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
    // this.getdata()
}

getdata(){
  this.apiservice.dashboard(this.exam).subscribe((res:any)=>{
    this.rowData = res.data
  })
}
excelexport(params:any){
  this.excelService.exportAsExcelFile(params, 'report');
}
}
