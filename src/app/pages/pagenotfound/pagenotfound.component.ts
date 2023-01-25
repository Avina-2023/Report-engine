import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(
    private authConfig: AppConfigService
  ) {

  }

  ngOnInit(): void {

  }
  goHome() {
    this.authConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }

}
