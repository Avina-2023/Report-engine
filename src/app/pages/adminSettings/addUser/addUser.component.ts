import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertServiceService } from 'src/app/services/alertService.service';
import { MatButtonModule } from '@angular/material/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgIf, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-addUser',
    templateUrl: './addUser.component.html',
    styleUrls: ['./addUser.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NzSelectModule, NgFor, MatButtonModule]
})
export class AddUserComponent implements OnInit {
  addUserForm: any;
  orglist: any = [];
  selectedOrg:any = [];
  // form_fname = 'fname';
  // form_lname = 'lname';
  // form_email = 'email';
  // form_orgId = 'orgid';
  // form_roleId = 'roleid';

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService,
    private alertservice: AlertServiceService
    ) { }

  ngOnInit() {
    this.forminitialize();
    this.getOrganizationList();

  }

  conform(){
    this.alertservice.alertDialog('success',"Do you want to close it?",'Press yes to close').then((data)=>{
      console.log(data)
    })
  }


  getOrganizationList(){
    this.apiservice.getOrganizationList().subscribe((data:any)=>{
      if(data.success&& data?.data?.length){
        this.orglist = data.data
      }
      console.log(this.orglist)
    })
  }

forminitialize(){
  this.addUserForm = this.fb.group({
    email: ['',[Validators.required]],
    fname: ['',[Validators.required]],
    lname: ['',[Validators.required]],
    orgid: [[],[Validators.required]],
    roleid: ['',[Validators.required]]
  })
}
formSubmit(){
  console.log(this.addUserForm,'form');
   if(this.addUserForm?.valid){
    console.log(this.addUserForm.value,'addUserForm');

    const apiData = {
      email: this.addUserForm.value.email,
      firstName: this.addUserForm.value.fname,
      lastName: this.addUserForm.value.lname,
      orgId: this.addUserForm.value.orgid,
      roleId: this.addUserForm.value.roleid,
    }
    console.log(this.addUserForm,'apiData');

    this.apiservice.register(apiData).subscribe((res:any)=>{
      console.log(res);

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
get email(){
  return this.addUserForm?.get('email');
}
get fname(){
  return this.addUserForm?.get('fname');
}
get lname(){
  return this.addUserForm?.get('lname');
}
get orgid(){
  return this.addUserForm?.get('orgid');
}
get roleid(){
  return this.addUserForm?.get('roleid');
}
}
