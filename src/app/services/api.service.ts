import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;
  ELASTIC_URL = environment.ELASTIC_BASE_URL;

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
  ScheduleDetails(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/scheduleDetails`,data)
  }
  Dashboard(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/dashboard`,data)
  }
  liveDashboard(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/liveDashboard`,data)
  }
  ChartDetails(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/chartDetails`,data)
  }
  liveUserDashboard(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/liveUserDashboard`,data)
  }
  dashboard_offline(data:any){
    if (data == undefined) {
      data = {};
    }
    return this.http.post(`${this.BASE_URL}/batchWiseDashboard`,data)
  }
  userdashboard(data:any){
  return this.http.post(`${this.BASE_URL}/userdashboard`,data)
  }
  dateWiseSectionReport(data:any,endPoint:string){
   return this.http.post(`${this.BASE_URL}/${endPoint}`,data)
  }
  reportDataFetch(data:any,endPoint:string){
    return this.http.post(`${this.BASE_URL}/${endPoint}`,data)
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
