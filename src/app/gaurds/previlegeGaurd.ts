import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrevilegeGaurd implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userDetail:any = localStorage.getItem('userDetails');
    const token = localStorage.getItem('token');
    let userRole = JSON.parse(userDetail).roleId;
    if (userRole!== "SADM"&& token !== null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
