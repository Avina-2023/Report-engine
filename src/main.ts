import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule } from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// import { IconDefinition } from '@ant-design/icons-angular';
// import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpLoaderInterceptor } from './app/interceptors/http-loader.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';

// const antDesignIcons = AllIcons as {
//   [key: string]: IconDefinition;
// };
// const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
import { LicenseManager } from  'ag-grid-enterprise'

LicenseManager.setLicenseKey('CompanyName=LARSEN & TOUBRO LIMITED,LicensedGroup=L&T EduTech,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=3,AssetReference=AG-017299,ExpiryDate=15_July_2022_[v2]_MTY1NzgzOTYwMDAwMA==d6a472ece2e8481f35e75c20066f8e49')




bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule, AppRoutingModule, ReactiveFormsModule, AgGridModule.withComponents([]), FormsModule, CalendarModule, MatCardModule, NgApexchartsModule, NzDatePickerModule, SweetAlert2Module.forRoot()
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
            provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true
        },
        { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue:"" },
        HttpClient,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
