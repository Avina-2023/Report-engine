import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-adminSettings',
    templateUrl: './adminSettings.component.html',
    styleUrls: ['./adminSettings.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AdminSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
