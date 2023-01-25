import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public taoSyncPercentage: any;
  @Output() progress: EventEmitter<boolean> = new EventEmitter();
  socket = io(environment.API_BASE_URL)

  constructor() { }
  getPercentage() {
    this.socket.on('taoSyncDet', (data: any) => {
      this.taoSyncPercentage = data.taoSyncPercentage;
      this.newMessageReceived(data);
      this.progress.emit(data);
    });
  }

  socketOf() {
    this.socket.on('disconnectThatSoc', () => {
      this.socket.disconnect();
    });
  }

  newMessageReceived(data: any) {
    const observable = new Observable<any>(observer => {
      observer.next(data);
    });
    return observable;
  }
}
