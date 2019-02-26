import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '@shared/services/game.service';
import { HubService } from '@shared/services/hub.service';
import { PlayerService } from '@shared/services/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-play-room',
  templateUrl: './play-room.component.html',
  styleUrls: ['./play-room.component.scss']
})
export class PlayRoomComponent implements OnInit, OnDestroy {
  private connectionId: string;

  challenge: string;
  answered: boolean;

  constructor(
    public hub: HubService,
    public game: GameService,
    public player: PlayerService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hub.connectionId$.subscribe(connectionId => {
      this.connectionId = connectionId;
      this.player.addPlayer({ connectionId: this.connectionId }).subscribe();
    });

    this.hub.challenge$.subscribe(challege => {
      this.challenge = challege;
      this.answered = false;
    });

    this.hub.answerFound$.subscribe(answer => {
      this.toastr.info('Next Round Starts in 5 Sec', `${answer.connectionId} Found Answer`);
    });

    this.hub.answerRecieved$.subscribe(answer => {
      if (answer.connectionId !== this.connectionId) { return; }

      if (answer.firstCorrectAnswer) {
        this.toastr.success('+1 point', 'Correct');
      }

      if (!answer.correctAnswer) {
        this.toastr.error('-1 point', 'Incorrect');
      }
    });

  }

  addAnswer(answer: boolean) {
    this.game.addAnswer({ connectionId: this.connectionId, answer: answer }).subscribe();
    this.answered = true;
  }

  ngOnDestroy() {
    this.player.removePlayer({ connectionId: this.connectionId }).subscribe();
  }
}
