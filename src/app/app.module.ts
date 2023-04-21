import { TinycardComponent } from './pages/dashboard/widgets/tinycard/tinycard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//  import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraphcardComponent } from './pages/dashboard/widgets/graphcard/graphcard.component';
import { FooterComponent } from './pages/commons/footer/footer.component';
import {HeaderComponent} from './pages/commons/header/header.component'
import { SideMenuBarComponent } from './pages/commons/sideMenuBar/sideMenuBar.component';
import { ExamStatusReportComponent } from './pages/examStatusReport/examStatusReport.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {MatCardModule} from '@angular/material/card';
import {CalendarModule} from 'primeng/calendar';
import { NgApexchartsModule } from "ng-apexcharts";
import { LoadingSpinnerComponent } from './pages/commons/loadingSpinner/loadingSpinner.component';
import { HttpLoaderInterceptor } from './interceptors/http-loader.interceptor';
import { AdminSettingsModule } from './pages/adminSettings/adminSettings.module';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { ProctorComponent } from './pages/proctor/proctor.component';
import { MinidetailscardComponent } from './pages/minidetailscard/minidetailscard.component';
import { DetailscardComponent } from './pages/detailscard/detailscard.component';
import { Dashboard_VMSSComponent } from './pages/dashboard_VMSS/dashboard_VMSS.component';

import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('CompanyName=LARSEN & TOUBRO LIMITED,LicensedGroup=L&T EduTech,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=3,AssetReference=AG-017299,ExpiryDate=15_July_2022_[v2]_MTY1NzgzOTYwMDAwMA==d6a472ece2e8481f35e75c20066f8e49');

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    SideMenuBarComponent,
    ExamStatusReportComponent,
    GraphcardComponent,
    TinycardComponent,
    ProctorComponent,
    DetailscardComponent,
    Dashboard_VMSSComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    FormsModule,
    CalendarModule,
    MatCardModule,
    AdminSettingsModule,
    NgApexchartsModule,
    MinidetailscardComponent,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true
    },
    { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons },
    HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
