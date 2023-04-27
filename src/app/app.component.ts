import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { InterComponentMessenger } from './services/interComponentMessenger.service';
import { FooterComponent } from './pages/commons/footer/footer.component';
import { SideMenuBarComponent } from './pages/commons/sideMenuBar/sideMenuBar.component';
import { HeaderComponent } from './pages/commons/header/header.component';
import { NgClass, NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from './pages/commons/loadingSpinner/loadingSpinner.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [LoadingSpinnerComponent, NgClass, NgIf, HeaderComponent, SideMenuBarComponent, RouterOutlet, FooterComponent]
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
