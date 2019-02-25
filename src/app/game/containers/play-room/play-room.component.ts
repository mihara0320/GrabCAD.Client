import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '@shared/services/game.service';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { environment } from '@environments/environment';
import { HubService } from '@shared/services/hub.service';
import { PlayerService } from '@shared/services/player.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-play-room',
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent implements OnInit, OnDestroy {
  private _hubConnection: HubConnection;
  private connectionId: string;

  challenge: any;
  value: any;
  players: any;

  constructor(
    public hub: HubService,
    public game: GameService,
    public player: PlayerService,
  ) { }

  ngOnInit() {
    this._hubConnection = this.hub._hubConnection;

    this._hubConnection.on('AnswerRecieved', (data: any) => {
      const received = `Received: ${data}`;
      console.log(JSON.stringify(data));
    });

    this._hubConnection.on('AnswerFound', (data: any) => {
      const received = `AnswerFound: ${data}`;
      console.log(JSON.stringify(data));
    });

    // this._hubConnection.on('RequestNextChallenge', () => {
    //   console.log('RequestNextChallenge');
    // });
    this.hub.connectionId$.subscribe(connectionId => {
        this.connectionId = connectionId;
        this.player.addPlayer({ connectionId: this.connectionId }).subscribe();
      });
  }

  getChallenge() {
    this.game.getChallenge().subscribe(data => this.challenge = data);
  }

  getAnswers() {
    this.game.getAnswers().subscribe(data => this.value = data);
  }

  addAnswer(answer: boolean) {
    this.game.addAnswer({ connectionId: this.connectionId, answer: answer }).subscribe();
  }

  ngOnDestroy() {
    this.player.removePlayer({ connectionId: this.connectionId }).subscribe();
  }
}
