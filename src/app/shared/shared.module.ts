import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExternalModule } from './externals/external.module';
import { PipesModule } from './pipes/pipes.module';
import { ServicesModule } from './services/services.module';
import { HubService } from './services/hub.service';
import { PlayerLimitGuard } from './services/player-limit.guard';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  ExternalModule,
  PipesModule,
  ServicesModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // singleton services
        HubService,
        PlayerLimitGuard
      ]
    };
  }
}

