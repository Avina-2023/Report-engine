import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  @Output() dashboardData: EventEmitter<boolean> = new EventEmitter();
  socket = io(environment.socket_url)

  constructor() { }
  getDashboardData() {
    this.socket.on('dashboard', (data: any) => {
      // this.newMessageReceived(data);
      this.dashboardData.emit(data);
    });
  }

  socketOff() {
    this.socket.disconnect();
    this.socket.emit('logout', {userid:123});
    // this.socket.on('disconnectThatSoc', () => {
      this.socket.disconnect();
    // });
  }

  newMessageReceived(data: any) {
    const observable = new Observable<any>(observer => {
      observer.next(data);
    });
    return observable;
  }
}
