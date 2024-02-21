import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private selectedTabId: string | null = null;

  constructor() {
    this.selectedTabId = localStorage.getItem('selectedTabId');
  }

  getSelectedTabId(): string | null {
    return this.selectedTabId;
  }

  setSelectedTabId(tabId: string) {
    this.selectedTabId = tabId;
    localStorage.setItem('selectedTabId', tabId);
  }
}
