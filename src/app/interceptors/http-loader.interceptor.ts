import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private userDetail:any;
  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let locVal:string|null = localStorage.getItem('userDetails')
    this.userDetail = locVal?JSON.parse(locVal):null;
    this.totalRequests++;
    this.loadingService.setLoading(true);
    let modifiedReq  = request
    if(this.userDetail){
       modifiedReq = request.clone({ 
      headers: request.headers.set('user_id', this.userDetail.id),
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
