import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { AppConfigService } from '../utils/app-config.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private userDetail:any;
  constructor(
    private loadingService: LoaderService,
    private utility: AppConfigService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let locVal:string|null = localStorage.getItem('userDetails')
    this.userDetail = locVal?JSON.parse(locVal):null;
    this.totalRequests++;
    this.loadingService.setLoading(true);
    let modifiedReq  = request

    const enc_orgid = this.userDetail?.organisations[0]?.orgId?this.userDetail?.organisations[0]?.orgId.toString():"null"
    const enc_clusterId = this.userDetail?.clusterId?this.userDetail?.clusterId.toString():"null"
    if(this.userDetail){

      var organization = this.userDetail.subOrganizations
      var orgName=[]
      for( let i in organization){
        orgName.push(organization[i].subOrganizationName)
      }

      const enc_orgName = orgName.toString()
      const custom_headers= new HttpHeaders()
      .set('userid', this.utility.encryptData(this.userDetail.id))
      .set('orgid',this.utility.encryptData(enc_orgid))
      .set('clusterId',this.utility.encryptData(enc_clusterId))
      .set('isOrg',this.utility.encryptData(this.userDetail.isOrg))
      .set('orgName',this.utility.encryptData(enc_orgName))

       modifiedReq = request.clone({
      headers:custom_headers
    });
    }

    return next.handle(modifiedReq).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
