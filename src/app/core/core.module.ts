import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

import { MainComponent } from './containers/main/main.component';
import { MenuComponent } from './containers/menu/menu.component';

export const CONTAINERS = [
  MainComponent,
  MenuComponent
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
})
export class CoreModule { }
