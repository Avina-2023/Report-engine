import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tinycard',
  templateUrl: './tinycard.component.html',
  styleUrls: ['./tinycard.component.scss']
})
export class TinycardComponent implements OnInit {
  @Input() tinycardLabel = 'Input data needed';
  @Input() tinycardCount = 'Input data needed';
  @Input() wgColor: any = 'red';
  @Input() tinyCountDetails: any = "input data needed";
  @Input() iconClass: string = "icon-schedule";
  @Input() isDrawer = false;
  disp = false
  idle:any

  constructor() { }

  ngOnInit() {

  }

}
