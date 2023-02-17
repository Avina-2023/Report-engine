import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myvar = "newvar"
  Htmlstr = '<div style="display: flex;flex-wrap: wrap; align - content: center; justify - content: center; align - items: center; "><img style="width: 60 %; " src="../../../assets/images/loader.gif"/></div>'
  iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:_blank');
  items = [
    {
      name: "g"
    },
    {
      name: "a"
    },
    {
      name: "v"
    }
  ]

  error: any;
  onewayTP = true
  @ViewChild('kibona') iframe: ElementRef | undefined;
  html: any;
  htmlfile = '../../../assets/Html/maintanence.html'

  eulaContent: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private apiservice: ApiService) {

  }

  ngOnInit() {
    this.kibonacheck(environment.kibana_url)


  }
  kibonacheck(url:any) {
    this.apiservice.getkibona(url).subscribe(
      data => {
        this.Htmlstr = ""
        this.iframe?.nativeElement.removeAttributeNode("srcdoc")
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error => {
        
        this.iframe?.nativeElement.removeAttributeNode("srcdoc")
        if (this.onewayTP) {
          this.onewayTP = false
          this.IframeErrorHandle()
        }
        this.error = error.error.type;
      }
    );
  }
  IframeErrorHandle() {
    this.Htmlstr = ""
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.htmlfile)
    this.iframe?.nativeElement.contentWindow.location.replace(this.iframeSrc);
    // setTimeout(() => {  }, 5000);
  }
}
