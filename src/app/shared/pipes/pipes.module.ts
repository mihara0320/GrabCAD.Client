import { NgModule } from '@angular/core';
import { ObjectCountPipe } from './object-count.pipe';

export const PIPES = [ObjectCountPipe];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class PipesModule { }
