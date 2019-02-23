/* angular system moduleds */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* app moduleds */
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

/* root component */
import { MainComponent } from '@core/containers/main/main.component';

/* others */
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent],
})
export class AppModule { }
