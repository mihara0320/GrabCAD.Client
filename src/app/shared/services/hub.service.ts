import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  public _hubConnection: HubConnection;
  private playerCount: number;

  private connectionIdSubject = new ReplaySubject<string>();
  public connectionId$: Observable<string>;

  private playersSubject = new BehaviorSubject<number>(0);
  public players$: Observable<number>;

  private scoresSubject = new ReplaySubject<any>();
  public scores$: Observable<any>;

  private challengeSubject = new BehaviorSubject<string>(null);
  public challenge$: Observable<string>;

  constructor() {
    this.initHubConnection();
    this.players$ = this.playersSubject.asObservable();
    this.connectionId$ = this.connectionIdSubject.asObservable();
    this.scores$ = this.scoresSubject.asObservable();
    this.challenge$ = this.challengeSubject.asObservable().pipe(
      delay(this.getRequestDelay()), // to avoid simultaious request wtih other clients
      tap(challenge => {
        if (challenge == null && this.playerCount === 1) {
          this._hubConnection.invoke('RequestNextChallenge');
        }
      })
    );
  }

  private initHubConnection() {
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

    this._hubConnection.on('playerUpdate', n => {
      this.playerCount = n;
      this.playersSubject.next(n);
    });
    this._hubConnection.on('scoreUpdate', scores => this.scoresSubject.next(scores));
    this._hubConnection.on('challengeUpdate', challenge => this.challengeSubject.next(challenge));
  }

  private getConnectionId(): Promise<string> {
    return this._hubConnection.invoke('getConnectionId');
  }
  private getRequestDelay(): number {
    return Math.random() * (600 - 100) + 100;
  }
}
