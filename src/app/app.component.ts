import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InterComponentMessenger } from './services/interComponentMessenger.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{
  title = 'report_engine';
  href: any;
  hUD_Display:boolean = true;
  menuState: boolean = true;
constructor(private router:Router,private messenger:InterComponentMessenger){
  this.messenger.getMessage().subscribe((data)=>{
    console.log('inside sidemenu')
    console.log(data );

    if(data?.head === "sideMenuToggle"){
      this.menuState = data.value
    }
})
}





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
