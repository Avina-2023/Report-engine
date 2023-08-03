import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoTS from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  secretKey = '(!@#Passcode!@#)';

  constructor(
    private route: Router,
  ) { }

  // Navigations
  routeNavigation(path: any) {
    return this.route.navigate([path]);
  }
  routeNavigationParams(path: any, params: any) {
    return this.route.navigate([path, params]);
  }

  setlocalValue(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getLocalValue(key: any) {
    return localStorage.getItem(key)
  }

  // Clear local and session data
  clearLocalData() {
    return localStorage.clear();
  }
  logout() {
    this.clearLocalData();
    return this.routeNavigation('/');
  }
//user detail quick returns
  getUserDetails() {
    let userDetail = this.getLocalValue('userDetails');
    return JSON.parse(userDetail ? userDetail : '');
  }
  getUserOrg(): Number {
    return this.getUserDetails().organisations[0]?.orgId
  }

  getUserRole(): string {
    return this.getUserDetails()?.roleId
  }

  isLoggedin() {
    let token = localStorage.getItem('token')
    return token ? true : false;
  }

//Encription AES method
encryptData(data:string):string{
return CryptoTS.AES.encrypt(data, this.secretKey).toString();
}

}
