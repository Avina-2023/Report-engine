import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailscard',
  templateUrl: './detailscard.component.html',
  styleUrls: ['./detailscard.component.scss']
})
export class DetailscardComponent implements OnInit {

  @Input() iconClass: string = "icon-schedule";
  @Input() cardLabel:any = 'Input data needed';
  @Input() cardValue:any = 'data needed';
  @Input() wgColor: any = 'red';
  constructor() { }

  ngOnInit() {
  }

}
