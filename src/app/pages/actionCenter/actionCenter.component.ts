import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ColDef  } from 'ag-grid-enterprise';
import { FileSaverService } from 'ngx-filesaver';
import { ExcelService } from 'src/app/services/excelService';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule, DatePipe } from '@angular/common';
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
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { ButtonRendererComponent } from '../../renderer/button-renderer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AlertServiceService } from 'src/app/services/alertService.service';
@Component({
  selector: 'app-actionCenter',
  templateUrl: './actionCenter.component.html',
  styleUrls: ['./actionCenter.component.scss'],
  standalone: true,

    imports: [CommonModule,NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, AgGridModule,
      MatExpansionModule, MatTabsModule, MatMenuModule, MatSidenavModule, MatToolbarModule,CommonreportviewComponent,
      MinidetailscardComponent,MatDialogModule],
})
export class  ActionCenterComponent implements OnInit {

  @ViewChild('matDialog', { static: false })
  matDialogRef!: TemplateRef<any>;
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
  currentTabIndex = 3;
  reportList=[
    {
      report_Name:"Delivery Based",
      is_enable:true,
      is_download:false,
      endpoint:"actionDashboard"
    },
    {
      report_Name:"User Based",
      is_enable:true,
      is_download:false,
      endpoint:"actionUserDashboard"
    },
  ]
  rowDataClicked1: any;
  terminateparams: any;
  messageResponse: any;
  popupMessage: any;
  resultSync: any;
  scoreCheck: any;
  ProctorStatusSyn: any;
  scoreync: any;
  BehaviouralSync: any;
  apiCall: any;
  UserBehaviouralSync: any;
  UserProctorStatusSyn: any;
  UserScoreSync: any;
  ActivateUser: any;
  TerminateUser: any;
  syncRedisData: any;
  role: any;
  synLmsData: any;
  synLmsStatusData: any;


  constructor(
    private apiservice : ApiService,
    private utility: AppConfigService,
    private dialog: MatDialog,
    private alertservice: AlertServiceService
  ) {
    let userDetails:any = localStorage.getItem('userDetails');
    if(JSON.parse(userDetails)?.roleId == "SADM"){
      this.role = "SADM"
    }
    if(JSON.parse(userDetails)?.roleId == "ADM"){
      this.role = "ADM"
    }
    if(JSON.parse(userDetails)?.roleId == "CC"){
      this.role = "CC"
    }
    if(JSON.parse(userDetails)?.roleId == "LMSADMIN"){
      this.role = "LMSADMIN"
    }
    if(JSON.parse(userDetails)?.roleId == "OPS"){
      this.role = "OPS"
    }
    if(JSON.parse(userDetails)?.roleId == "CBT"){
      this.role = "CBT"
    }
  }

  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable:true,
  editable:false,
};

ngOnInit() {
  this.tabchange(0)

}
daterrange(event:any){

   if(event.length){
    this.tabdate = {
    "startdate":event?this.datepipe.transform(event[0], 'yyyy-MM-dd HH:mm'):"",
    "enddate":event?this.datepipe.transform(event[1], 'yyyy-MM-dd HH:mm'):""
  }

   this.tabchange(this.currentTabIndex);
}
}
frameworkComponents: any = {
  buttonRenderer: ButtonRendererComponent,
};

clickHandler() {
  this.sidenav.close();
}

dynamicallyConfigureColumnsFromObject(anObject: any) {

  this.ColDef = this.agGrid.api.getColumnDefs();
  this.ColDef.length = 0;
  this.columnDefs = [ ];
  if (anObject?.length) {

    const keys = Object.keys(anObject[0]);
    keys.forEach((key) =>

      this.columnDefs.push({
        field: key,
        headerName: key.replaceAll('_', ' ').replaceAll('Time', 'Date'),
        pinned: this.isColumnPinned(key),
      }),


    );

  }
   this.agGrid.api.setColumnDefs(this.columnDefs);
    this.agGrid.api.setRowData(anObject);
    this.rowData=anObject

  if (this.role === "LMSADMIN" || this.role === "SADM") {
    this.columnDefs.push({
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick.bind(this),
        buttons: [
          { label: 'Terminate', color: '#32557f' },
          { label: 'Result-Check', color: '#32557f' },
          { label: 'Score-Check', color: '#32557f' },
          { label: 'Score-Sync', color: '#32557f' },
          { label: 'ProctorStatusSync', color: '#32557f' },
          { label: 'BehaviouralSync', color: '#32557f' },
          { label: 'LmsStatusSync', color: '#32557f' },
          { label: 'LmsScoreSync', color: '#32557f' },
        ],
      },
      sortable: false,
      filter: false,
      width: 1000, // Adjust the width as needed
      // pinned: this.isColumnPinned("Actions")
    });
  } else {
    this.columnDefs.push({
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick.bind(this),
        buttons: [
          { label: 'Terminate', color: '#32557f' },
          { label: 'Result-Check', color: '#32557f' },
          { label: 'Score-Check', color: '#32557f' },
          { label: 'Score-Sync', color: '#32557f' },
          { label: 'ProctorStatusSync', color: '#32557f' },
          { label: 'BehaviouralSync', color: '#32557f' },
        ],
      },
      sortable: false,
      filter: false,
      width: 800, // Adjust the width as needed
      // pinned: this.isColumnPinned("Actions")
    });
  }
}
isColumnPinned(columnKey: string): boolean | 'left' | 'right' | null{
  if (columnKey === 'Test_Name'){
    return 'left';
  } else  if (columnKey === 'User_Mail'){
    return 'left';
  }
  return null; // Column is not pinned
}

dynamicallyConfigureforuserBased(anObject: any) {
  this.ColDef = this.agGrid.api.getColumnDefs();
  this.ColDef.length = 0;
  this.columnDefs = [ ];
  if (anObject?.length) {

    const keys = Object.keys(anObject[0]);

    keys.forEach((key) =>

      this.columnDefs.push({
        field: key,
        headerName: key.replaceAll('_', ' ').replaceAll('Time', 'Date'),
        pinned: this.isColumnPinned(key),
      }),

    );

  }
  this.agGrid.api.setColumnDefs(this.columnDefs);
    this.agGrid.api.setRowData(anObject);
    this.rowData=anObject
    this.columnDefs.push({
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick.bind(this),
        buttons: [
          { label: 'Terminate-User',color: '#32557f' },
          { label: 'syncRedisData',color: '#32557f' },
          { label: 'User-Score-Sync',color: '#32557f' },
          { label: 'UserProctorStatusSync',color: '#32557f' },
          { label: 'UserBehaviouralSync',color: '#32557f' },
        ],
      },
      sortable: false,
      filter: false,
      width: 800, // Adjust the width as needed
      // pinned: this.isColumnPinned("Actions")
    });
}

onBtnClick(params: any) {
  if(params.label === "Terminate"){
    this.terminateparams = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"endpoint":"terminateProcess"}
    this.popupMessage = "Are you sure you want to terminate users in this delivery?"
    this.apiCall = "Terminate"
    this.matDialogOpen()
  } else if (params.label === "Result-Check") {
    this.resultSync = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"endpoint":"resultIdCheck"}
    this.popupMessage = "Are you sure you want to check resultIds?"
    this.apiCall = "Result-Check"
    this.matDialogOpen()
  } else if (params.label === "Score-Check") {
    this.scoreCheck = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"endpoint":"scoreCheck"}
    this.popupMessage = "Are you sure you want to check score?"
    this.apiCall = "Score-Check"
    this.matDialogOpen()
  } else if (params.label === "Score-Sync") {
    this.scoreync = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"Test_Id":params.rowData.Test_Id,"endpoint":"bulkScoreSync"}
    this.popupMessage = "Are you sure you want to syn score?"
    this.apiCall = "Score-Sync"
    this.matDialogOpen()
  } else if (params.label === "ProctorStatusSync") {
    this.ProctorStatusSyn = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"endpoint":"proctorBulkStatusData"}
    this.popupMessage = "Are you sure you want to sync proctor Status?"
    this.apiCall = "ProctorStatusSyn"
    this.matDialogOpen()
  } else if (params.label === "BehaviouralSync") {
    this.BehaviouralSync = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"endpoint":"behaviourResultAks"}
    this.popupMessage = "Are you sure you want to sync behaviouralResult?"
    this.apiCall = "BehaviouralSync"
    this.matDialogOpen()
  } else if (params.label === "Terminate-User") {
    this.TerminateUser = {"Org_Id": params.rowData.Org_Id,"result_id":params.rowData.Result_Id,"endpoint":"userWiseTerminateProcess"}
    this.popupMessage = "Are you sure you want to terminate users : " +params.rowData.User_Mail+" ?"
    this.apiCall = "Terminate-User"
    this.matDialogOpen()
  } else if (params.label === "Activate-User") {
    this.ActivateUser = {"Org_Id": params.rowData.Org_Id,"result_id":params.rowData.Result_Id,"endpoint":"userWiseActiveProcess"}
    this.popupMessage = "Are you sure you want to Activate user?"
    this.apiCall = "Activate-User"
    this.matDialogOpen()
  } else if (params.label === "User-Score-Sync") {
    this.UserScoreSync = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"Test_Id":params.rowData.Test_Id,"Test_Taker_Id":params.rowData.Test_Taker_Id,"endpoint":"scoresync"}
    this.popupMessage = "Are you sure you want to sync score for user :" +params.rowData.User_Mail+" ?"
    this.apiCall = "User-Score-Sync"
    this.matDialogOpen()
  } else if (params.label === "UserProctorStatusSync") {
    this.UserProctorStatusSyn = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"Test_Name":params.rowData.Test_Name,"User_Mail":params.rowData.User_Mail,"endpoint":"proctorStatusData"}
    this.popupMessage = "Are you sure you want to sync User Proctor Status?"
    this.apiCall = "UserProctorStatusSyn"
    this.matDialogOpen()
  } else if (params.label === "UserBehaviouralSync") {
    this.UserBehaviouralSync = {"Org_Id": params.rowData.Org_Id,"Delivery_Id":params.rowData.Delivery_Id,"User_Mail":params.rowData.User_Mail,"endpoint":"userBehaviourResultAks"}
    this.popupMessage = "Are you sure you want to sync behaviouralResult?"
    this.apiCall = "UserBehaviouralSync"
    this.matDialogOpen()
  } else if (params.label === "syncRedisData") {
    this.syncRedisData = {"Org_Id": params.rowData.Org_Id,"result_id":params.rowData.Result_Id,"endpoint":"getUserRedisData"}
    this.popupMessage = "Are you sure you want to sync RedisData?"
    this.apiCall = "syncRedisData"
    this.matDialogOpen()
  } else if (params.label === "LmsScoreSync") {
    this.synLmsData = {"Org_Id": params.rowData.Org_Id,"Delivery_Id": [params.rowData.Delivery_Id],"endpoint":"lmsScoreSyncDelivery"}
    this.popupMessage = "Are you sure you want to sync lmsScore?"
    this.apiCall = "LmsScoreSync"
    this.matDialogOpen()
  } else if (params.label === "LmsStatusSync") {
    this.synLmsStatusData = {"Org_Id": params.rowData.Org_Id,"Delivery_Id": params.rowData.Delivery_Id,"endpoint":"bulkSyncAssessmentStatus"}
    this.popupMessage = "Are you sure you want to sync lmsStatus?"
    this.apiCall = "LmsStatusSync"
    this.matDialogOpen()
  }

}
// dateWiseitemReport(data:any){
//   let endPoint = "dateWiseitemReport"
//   if(this.utility.getUserOrg() === 57){
//     endPoint = "getitemdetails"
//   }
//   this.apiservice.dateWiseitemReport(data,endPoint).subscribe((res:any)=>{
//     this.rowData = res.data
//   })
// }

customTabDataFiller(data: any, endPoint: string) {
  this.apiservice.reportDataFetch(data, endPoint).subscribe((res: any) => {
    if(res && res.data && res.data[0]){
      this.alertservice.toastfire('success',res.message);
    } else {
      this.alertservice.toastfire('warning',res.message);
    }
    if (endPoint === "actionUserDashboard") {
      this.dynamicallyConfigureforuserBased( res.data) ;
    } else if (endPoint === "actionDashboard") {
      this.dynamicallyConfigureColumnsFromObject( res.data) ;
    }
  });
}

matDialogOpen() {
  const dialogRef = this.dialog.open(this.matDialogRef, {
    width: '400px',
    height: 'auto',
    autoFocus: false,
    closeOnNavigation: true,
    disableClose: false,
    panelClass: 'popupModalContainerForForms'
  });
}
terminateApi(params: any= this.terminateparams){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
resultCheck(params: any= this.resultSync){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
score_Check(params: any= this.scoreCheck){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
scoreSync(params: any= this.scoreync){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id,Test_Id:params.Test_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
proctorStatusSyn(params: any= this.ProctorStatusSyn){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
behaviouralSync(params: any= this.BehaviouralSync){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,deliveryid: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
TerminateUserApi(params: any= this.TerminateUser){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,result_id: params.result_id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
activateUseeApi(params: any= this.ActivateUser){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,result_id: params.result_id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
syncRedisDataApi(params: any= this.syncRedisData){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,result_id: params.result_id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
userScoreSync(params: any= this.UserScoreSync){
  this.apiCall=""
  this.apiservice.reportDataFetch({"Org_Id": params.Org_Id,"Delivery_Id":params.Delivery_Id,"Test_Id":params.Test_Id,"Test_Taker_Id":params.Test_Taker_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
userProctorSync(params: any= this.UserProctorStatusSyn){
  this.apiCall=""
  this.apiservice.reportDataFetch({"Org_Id": params.Org_Id,"Delivery_Id":params.Delivery_Id,"Test_Name":params.Test_Name,"User_Mail":params.User_Mail},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
userBehaviouralSync(params: any= this.UserBehaviouralSync){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,deliveryid: params.Delivery_Id,email: params.User_Mail},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
LmsScoreSyncApi(params: any= this.synLmsData){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}
LmsStatusSyncApi(params: any= this.synLmsStatusData){
  this.apiCall=""
  this.apiservice.reportDataFetch({Org_Id:params.Org_Id,Delivery_Id: params.Delivery_Id},params.endpoint).subscribe((res: any) => {
    if (res.success && res.success === true) {
      this.popupMessage = res.message
      this.messageResponse= res.message
    } else {
      this.popupMessage = res.message
      this.messageResponse= res.message
    }
  })
}

popupClose(){
  this.dialog.closeAll(); // Close all open dialogs
}

tabchange(index:any){
  this.currentTabIndex =index;
  this.rowData = []
  this.reportList.forEach((tab,i) => {
    if(index==i){
      this.customTabDataFiller(this.tabdate,tab.endpoint)
    }
  });

}
}



