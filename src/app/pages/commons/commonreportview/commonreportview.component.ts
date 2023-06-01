import { Component, OnInit,ViewChild,  Input, SimpleChanges, OnChanges } from '@angular/core';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { ColDef  } from 'ag-grid-enterprise';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from 'src/app/services/excelService';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-commonreportview',
  templateUrl: './commonreportview.component.html',
  styleUrls: ['./commonreportview.component.scss'],
  standalone: true,
  imports: [AgGridModule,MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule]
  
})
export class CommonreportviewComponent implements OnInit {

  @Input() tabledata = [];
  @Input() isdownload: boolean = false;
  ColDef: any;
  // rowData=[];
  constructor(
    private excelService:ExcelService,
  ) { }
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

  ngOnInit() {
    this.dynamicallyConfigureColumnsFromObject(this.tabledata)
    this.agGrid.api.setRowData(this.tabledata)
  }

  ngOnChanges(changes:SimpleChanges){

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
    this.tabledata=anObject
  }

  
}
