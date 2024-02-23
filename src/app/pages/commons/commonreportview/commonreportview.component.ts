import { Component, OnInit,ViewChild,  Input, SimpleChanges, OnChanges } from '@angular/core';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { ColDef, SideBarDef  } from 'ag-grid-enterprise';
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
  // @Input() isLegend:boolean = false
  ColDef: any;
  is_download: any;

  public sideBar: SideBarDef  = {
    toolPanels: ['filters'],
  };
  excelData: any;
  styleSheet: any;
  style: any;
  response: any;
  // "width: 100%; height: 380px;margin-top: 10px;"
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
    this.is_download = changes['isdownload']?.currentValue
    if(changes['tabledata'].currentValue && changes['tabledata'].currentValue.data && changes['tabledata'].currentValue.data.length ){
      this.dynamicallyConfigureColumnsFromObject(changes['tabledata'].currentValue)
      this.agGrid?.api.setRowData(changes['tabledata'].currentValue.data)
    } else if (changes['tabledata'].currentValue && changes['tabledata'].currentValue.length ) {
      this.dynamicallyConfigureColumnsanalysis(changes['tabledata'].currentValue)
      this.agGrid?.api.setRowData(changes['tabledata'].currentValue)
    } else {
      this.response=[]
      this.dynamicallyConfigureColumnsFromObject({"data": this.response})
      // this.agGrid?.api.setRowData()
    }
  }

  excelexport(params:any){
    this.excelService.exportAsCsvFile(params, 'report');
  }

  dynamicallyConfigureColumnsFromObject(anObject:any){
    this.styleSheet = "width: 100%; height: 380px;margin-top: 10px;"
    this.ColDef = this.agGrid?.api?.getColumnDefs();
    // this.ColDef.length=0;
    this.columnDefs = []
    if (anObject.data?.length && anObject.key?.length) {

      const keys = anObject.key
      keys.forEach((key: string) =>
        this.columnDefs.push({ field: key, headerName: key.replaceAll('_', ' ') })
      );
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api.setRowData(anObject.data);
      this.tabledata = anObject.data
      this.excelData= anObject
    } else if (anObject.data?.length) {
        const keys = Object.keys(anObject.data[0])
        keys.forEach(key =>
          this.columnDefs.push({ field: key, headerName: key.replaceAll('_', ' ') })
        );

      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api.setRowData(anObject.data);
      this.tabledata = anObject.data
      this.excelData= anObject

    } else {
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api?.setRowData(anObject.data);
      this.tabledata= anObject.data
    }
  }
  dynamicallyConfigureColumnsanalysis(anObject:any){
    this.styleSheet = " height: 300px;margin-left: 10px;margin-top: 5px;margin-bottom: 5px;"
    this.ColDef = this.agGrid?.api?.getColumnDefs();
    // this.ColDef.length=0;
    this.columnDefs = []
    if (anObject.data?.length && anObject.key?.length) {

      const keys = anObject.key
      keys.forEach((key: string) =>
        this.columnDefs.push({ field: key, headerName: key.replaceAll('_', ' ') })
      );
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api.setRowData(anObject.data);
      this.tabledata = anObject.data
      this.excelData= anObject
    } else if (anObject.length) {

        const keys = Object.keys(anObject[0])
        keys.forEach(key =>
          this.columnDefs.push({ field: key, headerName: key.replaceAll('_', ' ') })
        );
      this.agGrid?.api?.setColumnDefs(this.columnDefs);
      this.agGrid?.api.setRowData(anObject);
      this.tabledata = anObject
      this.excelData= anObject
    }
  }
}
