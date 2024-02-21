import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { APP_CONSTANTS } from '../../utils/app-constants.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgIf, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AlertServiceService } from 'src/app/services/alertService.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule,NzDatePickerModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, MatExpansionModule, MatTabsModule, MatMenuModule,
       MatSidenavModule, MatToolbarModule,CommonreportviewComponent,MinidetailscardComponent,
    MatCardModule, MatFormFieldModule, MatInputModule, NgIf, NzSelectModule, NgFor],
})

export class RegistrationComponent implements OnInit {
  addOrgForm: any;
  addSubOrgForm: any;
  addUserForm: any;
  APP_CONSTANTS  = APP_CONSTANTS;
  currentTabIndex: any;
  rowData: any;
  orglist: any;
  roleList: any;
  isOrg: any;
  subOrgList: any[] = [{"subOrganizationName": "Need to select OrganizationName"}];
  clusterList: any;


  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private alertservice: AlertServiceService
    ) { }

  ngOnInit() {
    this.tabchange(0)
    this.forminitialize();
  }

  registraterList=[
    {
      report_Name:"Organization",
    },
    {
      report_Name:"subOrganization",
    },
    {
      report_Name:"users",
    }
  ]



forminitialize(){
  this.addOrgForm = this.fb.group({
    organizationName: ['',[Validators.required]]
  })
  this.addSubOrgForm = this.fb.group({
    subOrganizationName: ['',[Validators.required]],
    orgDetail: ['',[Validators.required]],
  })
  this.addUserForm = this.fb.group({
    orgid :  [[],],
    subOrgId : [[]],
    email : ['',[Validators.required]],
    fname : ['',[Validators.required]],
    lname : ['',[Validators.required]],
    roleName : ['',[Validators.required]],
    password : ['',[Validators.required]],
    clusterid :  [[],[Validators.required]],
  })
}

conform(){
  this.alertservice.alertDialog('success',"Do you want to close it?",'Press yes to close').then((data)=>{
  })
}

  tabchange(index: any) {
    this.currentTabIndex = index;
    this.rowData = []

      this.registraterList.forEach((tab, i: any) => {

        if (index === i) {
          if (index === 0) {
            this.organization()
          } else if (index === 1) {
            this.subOrganization()
          } else if (index === 2) {
            this.users()
          }
        }
      });
  }
  organization() {

  }
  OrgSubmit(){

    if(this.addOrgForm?.valid){

      const apiData = {
        organizationName: this.addOrgForm.value.organizationName,
      }


      this.apiservice.reportDataFetch(apiData,"createOrganization").subscribe((res: any) => {

        if(res.success){
          this.alertservice.toastfire('success',res.message);
        }else{
          this.alertservice.toastfire('warning',res.message);
        }
      })

    }else{
    this.alertservice.toastfire('warning',"Please fill all mandatory fields");
   }
  }
  subOrgSubmit(){
    // var orgId = this.orglist.map()

    if(this.addSubOrgForm?.valid){

      const apiData = {
        organizationName: this.addSubOrgForm.value.orgDetail.organizationName,
        orgId: this.addSubOrgForm.value.orgDetail.orgId,
        subOrganizationName: this.addSubOrgForm.value.subOrganizationName,
      }


      this.apiservice.reportDataFetch(apiData,"createSubOrganization").subscribe((res: any) => {

        if(res.success){
          this.alertservice.toastfire('success',res.message);
        }else{
          this.alertservice.toastfire('warning',res.message);
        }
      })

    }else{
    this.alertservice.toastfire('warning',"Please fill all mandatory fields");
   }
  }
  userFormSubmit(){

    if(this.addUserForm?.valid){
      if (this.addUserForm.value.orgid && this.addUserForm.value.orgid[0] && this.addUserForm.value.orgid[0] != undefined) {
        this.isOrg="1"
      } else {
        this.isOrg="0"
      }
      const apiData = {
        "orgId" : this.addUserForm.value.orgid,
        "subOrgId" : this.addUserForm.value.subOrgId,
        "isApproved" : false,
        "isActive" : true,
        "email" : this.addUserForm.value.email,
        "firstName" : this.addUserForm.value.fname,
        "lastName" : this.addUserForm.value.lname,
        "roleId" : this.addUserForm.value.roleName,
        "password" : this.addUserForm.value.password,
        "clusterId" : this.addUserForm.value.clusterid,
        "isOrg" : this.isOrg
      }


      this.apiservice.reportDataFetch(apiData,"createuser").subscribe((res: any) => {


        if(res.success){
          this.alertservice.toastfire('success',res.message);
        }else{
          this.alertservice.toastfire('warning',res.message);
        }
      })

    }else{
    this.alertservice.toastfire('warning',"Please fill all mandatory fields");
   }
  }
  users() {
    this.getOrganizationList()
    this.getRoleList()
    this.getClusterList()
  }
  subOrganization() {
    this.getOrganizationList()
  }
  getOrganizationList(){
    this.apiservice.reportDataFetch("","getOrganizationList").subscribe((res: any) => {

      if(res.success && res?.data?.length){
        this.orglist = res.data
      }
    })
  }
  getRoleList(){

    this.apiservice.reportDataFetch("","getRoleList").subscribe((res: any) => {

      if(res.success && res?.data?.length){
        this.roleList = res.data

      }
    })
  }
  getClusterList() {

    this.apiservice.reportDataFetch("","getClusterList").subscribe((res: any) => {

      if (res.success && res?.data?.length) {
        this.clusterList = res.data;
      }
    });
  }
  getSubOrganizationList(selectedOrgIds: any){
    this.apiservice.reportDataFetch({"orgIds":selectedOrgIds},"getSubOrganizationList").subscribe((res: any) => {

      if (res.success && res?.data?.length) {
        this.subOrgList = res.data;
      }
    });
  }

  get organizationName() {
    return this.addOrgForm.get('organizationName');
  }

  get orgDetail() {
    return this.addSubOrgForm.get('orgDetail');
  }

  get orgId(){
    return this.addSubOrgForm.get('orgid');
  }

  get subOrganizationName(){
    return this.addSubOrgForm.get('subOrganizationName');
  }

  get orgid(){
    return this.addUserForm.get('orgid');
  }
  get clusterid(){
    return this.addUserForm.get('clusterid');
  }
}
