import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tinycard',
  templateUrl: './tinycard.component.html',
  styleUrls: ['./tinycard.component.scss']
})
export class TinycardComponent implements OnInit {
  @Input() tinycardLabel = '';
  @Input() tinycardCount = '';
  @Input() wgColor: any;
  @Input() tinyCountDetails: any;
  @Input() iconClass: string = "icon-close";
  @Input() isDrawer = false;
  disp = false
  idle:any

  constructor() { }

  ngOnInit() {

  }

}
