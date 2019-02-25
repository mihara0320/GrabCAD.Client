import { NgModule } from '@angular/core';

import { GameService } from './game.service';
import { PlayerService } from './player.service';

@NgModule({
  providers: [
    GameService,
    PlayerService
  ]
})
export class ServicesModule { }
