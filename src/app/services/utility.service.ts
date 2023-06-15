import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';

@Injectable({
    providedIn: 'root'
  })
export class UtilityService {
secretKey = '(!@#Passcode!@#)';

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

//Encription AES method
encryptData(data:string):string{
return CryptoTS.AES.encrypt(data, this.secretKey).toString();
}

}
