import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
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
    ) { }

  ngOnInit() {
    this.forminitialize();
    this.getOrganizationList();
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
        alert('success')
      }else{
        alert('false')
      }
    })
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
