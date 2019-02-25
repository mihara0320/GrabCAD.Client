import { NgModule } from '@angular/core';
import { MainComponent } from './containers/main/main.component';
import { PlayRoomComponent } from './containers/play-room/play-room.component';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '@shared/shared.module';

export const CONTAINERS = [
  MainComponent,
  PlayRoomComponent
];

@NgModule({
  imports: [
    GameRoutingModule,
    SharedModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class GameModule { }
