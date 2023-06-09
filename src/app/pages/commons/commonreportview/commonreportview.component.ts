import { Component, OnInit,ViewChild,  Input, SimpleChanges, OnChanges } from '@angular/core';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { ColDef  } from 'ag-grid-enterprise';
import { ExcelService } from 'src/app/services/excelService';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
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
  imports: [CommonModule,AgGridModule,MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule]
  
})
export class CommonreportviewComponent implements OnInit {

  @Input() tabledata = [];
  @Input() isdownload:any;
  ColDef: any;
  is_download: any;
  
  constructor(
    private excelService:ExcelService,
  ) { }
   
   public columnDefs: ColDef[] = []
   
   public defaultColDef: ColDef = {
     sortable: true,
     filter: true,
     resizable:true,
     editable:false,
     
   };

@ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit() {
    // this.dynamicallyConfigureColumnsFromObject(this.tabledata)
    // this.agGrid.api.setRowData(this.tabledata)
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    this.is_download = changes['isdownload']?.currentValue
    this.dynamicallyConfigureColumnsFromObject(changes['tabledata'].currentValue)
    this.agGrid.api.setRowData(changes['tabledata'].currentValue)
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
