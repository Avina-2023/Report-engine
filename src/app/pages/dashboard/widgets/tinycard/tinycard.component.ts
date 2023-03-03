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
  @Input() iconClass: string = "icon-close";

  constructor() { }

  ngOnInit() {
  }

}
