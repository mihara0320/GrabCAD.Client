import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ScoreBoardComponent } from './score-board/score-board.component';

export const COMPONENTS = [
  ScoreBoardComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule { }
