import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
myvar="newvar"
iframeSrc: SafeUrl;

items=[
  {
    name:"g"
  },
  {
    name:"a"
  },
  {
    name:"v"
  }
]
  constructor(private sanitizer: DomSanitizer) {
    let url = "http://kibanaprod.lntedutech.com/"
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

  ngOnInit() {
  }

}
