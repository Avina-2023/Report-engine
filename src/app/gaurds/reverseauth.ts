
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Reverseauth implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const userDetail:any = localStorage.getItem('userDetails');
    if (token) {
      let userRole = JSON.parse(userDetail).roleId;
      if (userRole== "VMSS") {
        this.router.navigate(['dashboard_VMSS']);
      }else{
        this.router.navigate(['dashboard']);
      }
      return false;
    }
    return true;
  }
}
