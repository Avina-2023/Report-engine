import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UtilityService {

constructor() {  }
getUserDetails(){
    let userDetail = localStorage.getItem('userDetails')
return JSON.parse(userDetail?userDetail:'');
}
getUserOrg():Number{
    return this.getUserDetails().organisations[0]?.orgId
}

getUserRole():string{
return this.getUserDetails()?.roleId
}

}
