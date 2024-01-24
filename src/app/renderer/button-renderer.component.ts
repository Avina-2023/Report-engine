import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
  <div class="button-container">
  <button
    *ngFor="let button of buttons"
    type="button"
    (click)="onClick(button.label)"
    [style.background-color]="button.color"
  >
    {{ button.label }}
  </button>
</div>
`,
styles: [`
    .button-container button {
      border: none;
      border-radius: 8px; /* Adjust the border-radius to control the roundness of edges */
      margin: 5px; /* Add margin for spacing between buttons */
      cursor: pointer;
      height: 30px;
      color:white;
    }
  `],
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  buttons: { label: string; color: string }[] = [];
  params: any = {};

  agInit(params: any): void {
    this.params = params;
    this.buttons = this.params.buttons || [];
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick(label: string) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: null,
        rowData: this.params.node.data,
        label: label,
      };
      this.params.onClick(params);
    }
  }
}
@NgModule({
  declarations: [ButtonRendererComponent],
  imports: [CommonModule],
})
export class ButtonRendererModule {}
