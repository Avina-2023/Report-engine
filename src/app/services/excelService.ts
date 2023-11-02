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
  public exportAsCsvFile(json: any, excelFileName: string): void {
    console.log(json);
    let keys: string[] = [];

    if(json.key && json.key[0] && json.key[0]!= undefined){
       keys= json.key
    } else if(json.data && json.data[0] && json.data[0]!= undefined){
     for (const data of json.data) {
      const keys1 = Object.keys(data);
      keys.push(...keys1);
    }
  }
    const distinctKeys = Array.from(new Set(keys));

    function preprocessValue(value: any): string {

      const result = String(value);
      if (result !== 'undefined') {
        return result;
      }
      return '';
    }

    function convertJsonToCsv(jsonData: any[]): any[] {
      const headers = distinctKeys;
      const csvData = jsonData.map((item) =>
        headers.map((header) => preprocessValue(item[header]))
      );
      return [headers, ...csvData];
    }

    const csvData = convertJsonToCsv(json.data);

    const csvString = csvData.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = excelFileName + '.csv';

    a.click();

    window.URL.revokeObjectURL(url);

  }
}


function preprocessValue(value: any, any: any) {
  throw new Error('Function not implemented.');
}

