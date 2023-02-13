import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ExcelService {
  constructor(private fileserver: FileSaverService) { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json);
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blobData = new Blob([excelBuffer], { type: EXCEL_TYPE })
    this.fileserver.save(blobData, excelFileName)
  }


}


