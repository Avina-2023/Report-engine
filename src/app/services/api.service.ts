import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
  ) { }


  register(data: any) {
    return this.http.post(`${this.BASE_URL}/create-user`, data)
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  uploaded(file: any) {
    return this.http.post(`${this.BASE_URL}/uploadQuestion`, file);
  }

  getOrganizationList(){
    return this.http.get(`https://uapedgeservicedev.lntedutech.com/getUapOrganizations`)
  }

  dashboard(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/dashboard`,data)
  }
  userdashboard(data:any){
  return this.http.post(`${this.BASE_URL}/userdashboard`,data)
  }
  dateWiseSectionReport(data:any){
   return this.http.post(`${this.BASE_URL}/dateWiseSectionReport`,data)
  }
  proctor(data:any){
    console.log(data);
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/proctordashboard`,data)
   }
  getkibona(url:any){
    return this.http.get(url,{responseType: 'text'});
  }
  getVMSSDetails(data:any){
    return this.http.post(`${this.BASE_URL}/vmssdashboard-details`,data)
  }
  getErrpage(){
    return this.http.get('/assets/Html/maintanence.html')
  }
}
