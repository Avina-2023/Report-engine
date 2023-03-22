import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  @Output() dashboardData: EventEmitter<boolean> = new EventEmitter();
  socket: any;


  constructor() { }
  startConnection(){
     this.socket = io(environment.socket_url)
     return this.socket
  }
  getDashboardData() {

      this.startConnection().on('LiveDashboard', (data: any) => {
      // this.newMessageReceived(data);
      console.log('receivingSocketData')
      this.dashboardData.emit(data);
    });
    console.log(this.socket.connected, 'issocket connected on')
  }

  socketOff() {
    this.socket.disconnect();
    this.socket.emit('logout', {userid:123});
    // this.socket.on('disconnectThatSoc', () => {
      this.socket.disconnect();
      console.log(this.socket.connected, 'issocket connected')
    // });
  }

  newMessageReceived(data: any) {
    const observable = new Observable<any>(observer => {
      observer.next(data);
    });
    return observable;
  }
}
