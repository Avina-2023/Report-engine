import { appConfig } from './app/app.config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpLoaderInterceptor } from './app/interceptors/http-loader.interceptor';

import { LicenseManager } from 'ag-grid-enterprise';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CalendarModule } from 'primeng/calendar';
import { routes } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

LicenseManager.setLicenseKey(
  'CompanyName=LARSEN & TOUBRO LIMITED,LicensedGroup=L&T EduTech,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=2,LicensedProductionInstancesCount=2,AssetReference=AG-029335,SupportServicesEnd=15_July_2023_[v2]_MTY4OTM3NTYwMDAwMA==ea975a8ce95adb8389ad0ea402c73b57'
);

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      importProvidersFrom(
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        AgGridModule,
        FormsModule,
        CalendarModule,
        MatCardModule,
        NgApexchartsModule,
        NzDatePickerModule,
        SweetAlert2Module.forRoot()
        // ToastrModule.forRoot(
        //   {
        //     timeOut: 3000,
        //     preventDuplicates: true,
        //     maxOpened: 1,
        //     autoDismiss: true,
        //     progressBar: true,
        //     progressAnimation: 'increasing',
        //     closeButton: true
        //   }
        // ),
      ),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpLoaderInterceptor,
        multi: true,
      },
      { provide: NZ_I18N, useValue: en_US },
      { provide: NZ_ICONS, useValue: '' },
      HttpClient,
      provideAnimations(),
      provideHttpClient(withInterceptorsFromDi()),
    ],
  }
  ).catch((err:any) =>
  console.error(err)
);


// function provideRouter(routes: any) {
//     throw new Error('Function not implemented.');
// }

// function importProvidersFrom(CommonModule: any, BrowserModule: any, ReactiveFormsModule: any, AgGridModule: any, FormsModule: any, CalendarModule: any, MatCardModule: any, NgApexchartsModule: any, NzDatePickerModule: any, arg9: any) {
//     throw new Error('Function not implemented.');
// }

// function provideAnimations() {
//     throw new Error('Function not implemented.');
// }

// function provideHttpClient(arg0: any) {
//     throw new Error('Function not implemented.');
// }

// function withInterceptorsFromDi(): any {
//     throw new Error('Function not implemented.');
// }

