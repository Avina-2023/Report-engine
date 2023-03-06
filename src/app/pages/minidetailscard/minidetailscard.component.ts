import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-minidetailscard',
  templateUrl: './minidetailscard.component.html',
  styleUrls: ['./minidetailscard.component.scss']
})
export class MinidetailscardComponent implements OnInit {

  @Input() minidetailscardLable =' ';
  @Input() minidetailscardLable2 =' ';
  @Input() minidetailscardLable3 = ' ';
  @Input() minidetailscardnum = ' ';

  constructor() { }

  ngOnInit() {
  }

}
