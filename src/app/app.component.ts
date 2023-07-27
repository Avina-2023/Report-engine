import { Component, OnInit} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { InterComponentMessenger } from './services/interComponentMessenger.service';
import { FooterComponent } from './pages/commons/footer/footer.component';
import { SideMenuBarComponent } from './pages/commons/sideMenuBar/sideMenuBar.component';
import { HeaderComponent } from './pages/commons/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './pages/commons/loadingSpinner/loadingSpinner.component';
import { TabHeadComponent } from './pages/commons/tabHead/tab-head.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [LoadingSpinnerComponent, CommonModule, HeaderComponent, SideMenuBarComponent, RouterOutlet, FooterComponent,TabHeadComponent]
})



export class AppComponent implements OnInit{
  title = 'report_engine';
  href: any;
  hUD_Display:boolean = false;
  menuState: boolean = true;
constructor(private router:Router,private messenger:InterComponentMessenger){
  this.messenger.getMessage().subscribe((data)=>{
    if(data?.head === "sideMenuToggle"){
      this.menuState = data.value
    }
})
}





ngOnInit() {
  this.href = this.router.setUpLocationChangeListener();
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
