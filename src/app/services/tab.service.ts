import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabStateService {
  private selectedTabId: string | null = null;
  private endpoint: string = '';

  constructor(private router: Router) {
    this.selectedTabId = localStorage.getItem('selectedTabId');

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.endpoint = event.url;
      });
  }

  getSelectedTabId(): string | null {
    return this.selectedTabId;
  }

  setSelectedTabId(tabId: string | null) {
    this.selectedTabId = tabId;
    localStorage.setItem('selectedTabId', tabId || ''); // Use an empty string if tabId is null
  }

  getEndpoint(): string {
    const lastSlashIndex = this.endpoint.lastIndexOf('/');
    return lastSlashIndex !== -1 ? this.endpoint.substring(lastSlashIndex + 1) : this.endpoint;
  }
}
