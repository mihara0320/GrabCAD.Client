import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '@core/containers/menu/menu.component';
import { PlayerLimitGuard } from '@shared/services/player-limit.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'game',
    canLoad: [PlayerLimitGuard],
    loadChildren: './game/game.module#GameModule'
  },
  { path: '**', redirectTo: 'game' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
