import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-minidetailscard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './minidetailscard.component.html',
  styleUrls: ['./minidetailscard.component.scss']
})
export class MinidetailscardComponent implements OnInit {
  @Input() label = 'data needed';
  @Input() val = 'input';
  @Input() c_color = 'green';
  @Input() iconClass = 'icon-logged_in';
  constructor() { }

  ngOnInit() {
  }

}
