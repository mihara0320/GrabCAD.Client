import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { KeyValuePair } from '@core/models/keyValuePair.model';
import { Answer } from '@core/models/answer.model';

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

  private scoresSubject = new ReplaySubject<KeyValuePair[]>();
  public scores$: Observable<KeyValuePair[]>;

  private challengeSubject = new BehaviorSubject<string>(null);
  public challenge$: Observable<string>;

  private answerRecievedSubject = new ReplaySubject<Answer>();
  public answerRecieved$: Observable<Answer>;

  private answerFoundSubject = new ReplaySubject<Answer>();
  public answerFound$: Observable<Answer>;

  constructor() {
    this.initHubConnection();
    this.players$ = this.playersSubject.asObservable();
    this.connectionId$ = this.connectionIdSubject.asObservable();
    this.scores$ = this.scoresSubject.asObservable();
    this.challenge$ = this.challengeSubject.asObservable();
    this.answerRecieved$ = this.answerRecievedSubject.asObservable();
    this.answerFound$ = this.answerFoundSubject.asObservable();
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
      if (n === 1) {
        this._hubConnection.invoke('RequestNextChallenge');
      }
      this.playersSubject.next(n);
    });
    this._hubConnection.on('scoreUpdate', scores => this.scoresSubject.next(scores));
    this._hubConnection.on('challengeUpdate', challenge => this.challengeSubject.next(challenge));
    this._hubConnection.on('answerRecieved', answer => this.answerRecievedSubject.next(answer));
    this._hubConnection.on('answerFound', answer => this.answerFoundSubject.next(answer));
  }

  private getConnectionId(): Promise<string> {
    return this._hubConnection.invoke('getConnectionId');
  }

}
