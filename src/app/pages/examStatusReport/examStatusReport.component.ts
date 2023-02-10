import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-examStatusReport',
  templateUrl: './examStatusReport.component.html',
  styleUrls: ['./examStatusReport.component.css']
})
export class ExamStatusReportComponent implements OnInit {
  exam = { "date": "2023/02/02"};
  obj:any;
  constructor(
    private apiservice : ApiService,
  ) { }

  ngOnInit() {
    this.getdata()
  }

getdata(){


  this.apiservice.dashboard(this.exam).subscribe((res:any)=>{
    console.log(res)
    this.obj = res.data
  })
}
}
