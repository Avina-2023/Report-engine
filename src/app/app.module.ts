import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; 
import { FooterComponent } from './pages/commons/footer/footer.component';
import {HeaderComponent} from './pages/commons/header/header.component'
import { SideMenuBarComponent } from './pages/commons/sideMenuBar/sideMenuBar.component';
import { ExamStatusReportComponent } from './pages/examStatusReport/examStatusReport.component';
import { AgGridModule } from 'ag-grid-angular';
import {MatCardModule} from '@angular/material/card';
import {CalendarModule} from 'primeng/calendar';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PagenotfoundComponent,
    FooterComponent,
    HeaderComponent,
    SideMenuBarComponent,
    ExamStatusReportComponent,
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgGridModule,
    FormsModule,
    CalendarModule,
    MatCardModule,
    NgApexchartsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
        maxOpened: 1,
        autoDismiss: true,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true
      }
    ),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
