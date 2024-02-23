import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-enterprise';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexFill, ApexYAxis, ApexTooltip, ApexTitleSubtitle, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexTheme, NgApexchartsModule } from "ng-apexcharts";
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { ExcelService } from 'src/app/services/excelService';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MinidetailscardComponent } from '../minidetailscard/minidetailscard.component';
import { ButtonRendererComponent } from '../../renderer/button-renderer.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonreportviewComponent } from '../commons/commonreportview/commonreportview.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { jsPDF } from "jspdf";
import { AlertServiceService } from 'src/app/services/alertService.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  theme: ApexTheme;
};

@Component({
  selector: 'app-userDashboard',
  templateUrl: 'userDashboard.component.html',
  styleUrls: ['./userDashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, NzDatePickerModule, ReactiveFormsModule, FormsModule, NgApexchartsModule, MatButtonModule, MatIconModule, AgGridModule, MatCardModule,MinidetailscardComponent,MatDialogModule,CommonreportviewComponent]
})

export class UserDashboardComponent implements OnInit {

  @ViewChild('matDialog', { static: false })
  matDialogRef!: TemplateRef<any>;
  @ViewChild('matDialgrid', { static: false })
  matDiagridRef!: TemplateRef<any>;
  @ViewChild('matDialPdf', { static: false })
  matDialPdfdRef!: TemplateRef<any>;


  responseData: any;
  DashboardData: any;
  batchCount: any;
  total: any;
  ColDef: any;
  rowData: any;
  total_candidate: any;
  completed: any;
  Started: any;
  inprogress: any;
  terminated: any;
  proctorStarted: any;
  Yet_to_Start: any;
  date7: Date[] = [];
  userLog: any;
  popupMessage: any;
  popUpData: any;
  is_download: any;
  auditData: any;

  constructor(
    private apiservice: ApiService,
    public loader: LoaderService,
    public utility: AppConfigService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private scrollStrategyOptions: ScrollStrategyOptions,
    private alertservice: AlertServiceService
  ) {

  }

  public columnDefs: ColDef[] = [];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  };

  ngOnInit() {
    this.getUserDashboardAPI();
  }
  frameworkComponents: any = {
    buttonRenderer: ButtonRendererComponent,
  };

  getUserDashboardAPI() {

    if (this.utility.getUserOrg() === 57) {

    }
    else {

      this.total_candidate = 0
      this.completed = 0
      this.Yet_to_Start = 0
      this.inprogress = 0
      this.terminated = 0
      this.proctorStarted = 0

      this.apiservice.liveUserDashboard(this.DashboardData).subscribe((res: any) => {
        if (res && res.data && res.data[0]) {
          this.responseData = res.data;
          this.alertservice.toastfire('success', res.message);
          res.data.forEach((_item: any, _index: any) => {

            this.total_candidate = res.data.length
            if (_item.Test_Status == "Finished") {
              this.completed = this.completed + 1
            } else if (_item.Test_Status == "YetToStart") {
              this.Yet_to_Start = this.Yet_to_Start + 1
            } else if (_item.Test_Status == "Active") {
              this.inprogress = this.inprogress + 1
            } else if (_item.Test_Status == "Terminated") {
              this.terminated = this.terminated + 1
            }
            if (_item.Proctor_Status == "started") {
              this.proctorStarted = this.proctorStarted + 1
            }

          })
        } else {
          this.responseData = [];
          this.alertservice.toastfire('warning', res.message);
        }

        this.dynamicallyConfigureColumnsFromObject(this.responseData)
      });
    }

  }
  dynamicallyConfigureColumnsFromObject(anObject: any) {
    this.ColDef = this.agGrid.api.getColumnDefs();
    this.ColDef.length = 0;
    this.columnDefs = [];
    if (anObject?.length) {

      const keys = Object.keys(anObject[0]);

      keys.forEach((key) =>

        this.columnDefs.push({
          field: key,
          headerName: key.replaceAll('_', ' ').replaceAll('Time', 'Date'),
          pinned: this.isColumnPinned(key),
        }),

      );

    }
    this.agGrid.api.setColumnDefs(this.columnDefs);
    this.agGrid.api.setRowData(anObject);
    this.rowData = anObject

    if (this.utility.getUserOrg() === "57") {
      this.columnDefs.push({
        headerName: 'auditLog',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          buttons: [
            { label: 'View Logs', color: '#32557f' },
          ],
        },
        sortable: false,
        filter: false,
        width: 150, // Adjust the width as needed
        pinned: this.isColumnPinned("auditLog"),
      });
    } else {
      this.columnDefs.push({
        headerName: 'auditLog',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick.bind(this),
          buttons: [
            { label: 'Get Logs', color: '#32557f' },
          ],
        },
        sortable: false,
        filter: false,
        width: 150, // Adjust the width as needed
        pinned: this.isColumnPinned("auditLog"),
      });
    }
  }
  isColumnPinned(columnKey: string): boolean | 'left' | 'right' | null {
    if (columnKey === 'User_Mail') {
      return 'left';
    } else if (columnKey === 'auditLog') {
      return 'right';
    }
    return null; // Column is not pinned
  }
  daterrange(event: any) {

    if (event.length == 2) {
      let dateparams = {
        startdate: event ? moment(event[0]).format('yyyy-MM-DD HH:mm') : '',
        enddate: event ? moment(event[1]).format('yyyy-MM-DD HH:mm') : '',
      };
      this.DashboardData = dateparams;
      this.getUserDashboardAPI();

    }
  }
  excelexport(params: any) {
    this.excelService.exportAsExcelFile(params, 'report');
  }

  onBtnClick(params: any) {
    if (params.label === "Get Logs") {
      if (params && params.rowData && params.rowData.Result_Id) {
        this.userLog = { "result_id": params.rowData.Result_Id }
        this.apiservice.reportDataFetch(this.userLog, "userResponse").subscribe((res: any) => {
          if (res.success === true && res.data && res.data?.length) {
            this.is_download = false
            this.popUpData = { data: res.data };
            this.matPopUpOpen()
          } else {
            this.popupMessage = "User have not attented any questions"
            this.matDialogOpen()
          }
        });
      } else {
        this.popupMessage = "User have not started or attented any questions"
        this.matDialogOpen()
      }
    } else if (params.label === "View Logs") {

      if (params && params.rowData && params.rowData.Result_Id) {
        this.userLog = { "result_id": params.rowData.Result_Id }
        this.apiservice.reportDataFetch(this.userLog, "getAuditPdfReport").subscribe((res: any) => {
          if (res.success === true && res.data && res.data?.length) {
            this.is_download = false
            this.auditData = res.data;
            this.matPdfOpen()
          } else {
            this.popupMessage = "User have not started or attented any questions"
            this.matDialogOpen()
          }
        });
      }
    }
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms'
    });
  }
  matPopUpOpen() {
    const dialogRef = this.dialog.open(this.matDiagridRef, {
      width: '1000px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms'
    });
  }
  matPdfOpen() {
    const dialogRef = this.dialog.open(this.matDialPdfdRef, {
      width: '100%',
      height: '100%',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
      scrollStrategy: this.scrollStrategyOptions.block()
    });
  }

  generatePDF() {
    const doc = new jsPDF();
    let y = 20;
    const fontSize = 16;
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height - 20;
    const reportTitleElement = document.querySelector('.audit-trail-container h2') as HTMLElement;
    if (!reportTitleElement) {
      console.error('Report title element not found');
      return;
    }
    const reportTitle = reportTitleElement.innerText.trim();
    const textWidth = doc.getStringUnitWidth(reportTitle) * fontSize / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    // Add report title to PDF
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16); // Increase font size
    doc.text(reportTitle, x, y);
    y += 10;
    doc.setFontSize(9);
    doc.setFont('Arial', 'normal');
    const rollNoElement = document.querySelector('.candidate-details p:nth-child(1) span') as HTMLElement;
    const nameElement = document.querySelector('.candidate-details p:nth-child(2) span') as HTMLElement;
    const examElement = document.querySelector('.candidate-details p:nth-child(3) span') as HTMLElement;
    const subjectElement = document.querySelector('.candidate-details p:nth-child(4) span') as HTMLElement;
    const batchDateTimeElement = document.querySelector('.candidate-details p:nth-child(5) span') as HTMLElement;
    const durationElement = document.querySelector('.candidate-details p:nth-child(6) span') as HTMLElement;
    const auditTrailHeaderElement = document.querySelector('.audit-trail-container h3') as HTMLElement;
    if (!rollNoElement || !nameElement || !examElement || !subjectElement || !batchDateTimeElement || !durationElement || !auditTrailHeaderElement) {
      console.error('One or more elements not found');
      return;
    }
    const rollNo = rollNoElement.innerText.trim();
    const name = nameElement.innerText.trim();
    const exam = examElement.innerText.trim();
    const subject = subjectElement.innerText.trim();
    const batchDateTime = batchDateTimeElement.innerText.trim();
    const duration = durationElement.innerText.trim();
    const auditTrailHeader = auditTrailHeaderElement.innerText.trim();
    // Add data to PDF
    doc.text(`Roll No: ${rollNo}`, 10, y);
    y += 5;
    doc.text(`Name: ${name}`, 10, y);
    y += 5;
    doc.text(`Exam: ${exam}`, 10, y);
    y += 5;
    doc.text(`Subject: ${subject}`, 10, y);
    y += 5;
    doc.text(`Batch Date Time: ${batchDateTime}`, 10, y);
    y += 5;
    doc.text(`Duration: ${duration}`, 10, y);
    y += 5;
    doc.text(auditTrailHeader, 10, y);
    y += 5;
    // Draw the table headers
    const headers = ['Sl. No.', 'Action Item', 'Selected Option', 'ActionOn'];
    const colWidths = [20, 80, 40, 50];
    const headersHeight = 15;
    for (let i = 0; i < headers.length; i++) {
      doc.setFillColor(240, 240, 240);
      doc.rect(10 + this.sumArrayElements(colWidths, i), y, colWidths[i], headersHeight, 'F');
      doc.rect(10 + this.sumArrayElements(colWidths, i), y, colWidths[i], headersHeight, 'S'); // Add border line
      doc.setTextColor(0, 0, 0);
      doc.text(headers[i], 12 + this.sumArrayElements(colWidths, i), y + 10, { maxWidth: colWidths[i] - 2 });
    }
    y += headersHeight;
    // Draw the table rows
    const tableRows = document.querySelectorAll('.audit-trail-table tbody tr');
    const rowHeight = 15;
    for (let i = 0; i < tableRows.length; i++) {
      const cells = tableRows[i].querySelectorAll('td');
      if (!cells || cells.length !== headers.length) {
        console.error(`Invalid row at index ${i}`);
        continue;
      }
      if (y + rowHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }
      for (let j = 0; j < cells.length; j++) {
        const cellText = cells[j].innerText.trim();
        const maxWidth = colWidths[j] - 2;
        const textLines = doc.splitTextToSize(cellText, maxWidth);
        doc.rect(10 + this.sumArrayElements(colWidths, j), y, colWidths[j], rowHeight, 'S');
        doc.text(textLines, 12 + this.sumArrayElements(colWidths, j), y + 6, { maxWidth: colWidths[j] - 2 });
      }
      y += rowHeight;
    }
    doc.save(this.auditData[0].User_Mail + '-' + this.auditData[0].Test_Name + 'audit-trail.pdf');
  }

  sumArrayElements(arr: any, index: any) {
    return arr.slice(0, index).reduce((acc: any, curr: any) => acc + curr, 0);
  }


  popupClose() {
    this.dialog.closeAll(); // Close all open dialogs
  }


}

