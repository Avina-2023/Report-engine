import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { ColDef  } from 'ag-grid-enterprise';
import { CommonModule, DatePipe } from '@angular/common'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  standalone: true,

    imports: [CommonModule,NzDatePickerModule,AsyncPipe, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule, MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent,MinidetailscardComponent,MatFormFieldModule,MatInputModule, MatAutocompleteModule],
})
export class  AnalysisComponent implements OnInit {


  userData = { "date": "2023/02/14"};
  datepipe=new DatePipe('en-us')
  datewise:any={}
  obj:any;
  rowData:any=[];
  keyData:any=[];
  ColDef: any;
  value:Date[] | undefined;
  date7:any;
  sidenav: any;
  tabdate:any;
  currentTabIndex = 0;
  reportList=[
    {
      report_Name:"Test Averages",
      is_enable:true,
      is_download:true,
      endpoint:"getTestAverages"
    },
    {
      report_Name:"Test Candidate Answer",
      is_enable:true,
      is_download:true,
      endpoint:"getTestCandidateResponse"
    },
    {
      report_Name:"Test Candidate Scores",
      is_enable:true,
      is_download:true,
      endpoint:"getTestCandidateScore"
    },
    {
      report_Name:"Item Exposure Summary",
      is_enable:true,
      is_download:true,
      endpoint:"getItemExposure"
    },
  ]
  myControl = new FormControl();
  filteredOptions: Observable<any[]> | undefined;
  testData: any[] = [];
  testId: any;

  constructor(
    private apiservice : ApiService,
    private utility: AppConfigService,
  ) {


  }

public columnDefs: ColDef[] = []

public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable:true,
  editable:false,
};


ngOnInit() {
  this.testName();
  this.tabchange(0);
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    map(value => this._filter(value))
  );

}

private _filter(value: string): any[] {
  if (!value || typeof value !== 'string') {
    return [];
  }

  const filterValue = value.toLowerCase();
  return this.testData.filter(option => option.testName && option.testName.toLowerCase().includes(filterValue));
}


displayFn(option: any): string {
  return option && option.testName ? option.testName : '';
}

testName() {
  this.apiservice.reportDataFetch("", "getTestName").subscribe((res: any) => {
    if (res.data && res.data?.length) {
      this.testData = res.data;
    }
  });
}

onTestNameSelected(testOne: any) {
  this.testId = testOne.testId;
  this.tabchange(this.currentTabIndex)
}

customTabDataFiller(endPoint: string) {
  this.apiservice.reportDataFetch({ "testId": this.testId }, endPoint).subscribe((res: any) => {
    if (res.data && res.data?.length) {
      this.rowData = { data: res.data };
    }
  });
}

tabchange(index: number) {
  this.currentTabIndex = index;
  this.reportList.forEach((tab, i) => {
    if (index == i) {
      this.customTabDataFiller(tab.endpoint);
    }
  });
}


}



