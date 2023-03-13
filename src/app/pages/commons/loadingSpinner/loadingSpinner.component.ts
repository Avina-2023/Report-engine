import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-loadingspinner',
  templateUrl: './loadingSpinner.component.html',
  styleUrls: ['./loadingSpinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit() {
  }

}
