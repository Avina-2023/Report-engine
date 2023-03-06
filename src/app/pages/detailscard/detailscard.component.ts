import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detailscard',
  templateUrl: './detailscard.component.html',
  styleUrls: ['./detailscard.component.scss']
})
export class DetailscardComponent implements OnInit {

  @Input() detailscardicon = '';
  @Input() detailscardLable = '';
  @Input() detailscardCount = '';
  @Input() detailscardfooter = '';


  constructor() { }

  ngOnInit() {
    console.log( this.detailscardLable , 'detailscard')
  }

}
