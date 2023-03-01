import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{
  title = 'report_engine';
  href: any;
  hUD_Display:boolean = false;
constructor(private router:Router){}





ngOnInit() {
  this.href = this.router.setUpLocationChangeListener();
  console.log(this.router.url);
  this.router.events.subscribe((val) => {
    if(val instanceof NavigationEnd){
      let possiblePages = ['/','/login','/assets/Html/maintanence.html'];
      if(possiblePages.includes(val.url))
      {
        this.hUD_Display = false
      }else{
        this.hUD_Display = true
      }
    }
  })
}





}
