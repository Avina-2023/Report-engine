import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true
})
export class FooterComponent implements OnInit  {
  currentYear: number | undefined;

  constructor(){}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
