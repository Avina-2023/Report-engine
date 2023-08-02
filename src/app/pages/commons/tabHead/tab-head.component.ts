import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-head',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tab-head.component.html',
  styleUrls: ['./tab-head.component.scss'],
})
export class TabHeadComponent {}
