import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  public _hubConnection: HubConnection;

  private playersSubject = new BehaviorSubject<number>(0);
  public players$: Observable<number> = this.playersSubject.asObservable();

  private connectionIdSubject = new ReplaySubject<string>();
  public connectionId$: Observable<string>;

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hub)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start()
      .then(async () => {
        const connectionId = await this.getConnectionId();
        this.connectionIdSubject.next(connectionId);
      })
      .catch(err => console.error(err.toString()));

    this._hubConnection.on('playerUpdate', n => this.playersSubject.next(n));

    this.connectionId$ = this.connectionIdSubject.asObservable().pipe(take(1));
  }

  private getConnectionId(): Promise<string> {
    return this._hubConnection.invoke('getConnectionId');
  }
}
