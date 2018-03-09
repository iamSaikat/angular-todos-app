import {
  AppInterceptor
} from './service/app-interceptor';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  HttpModule
} from '@angular/http';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import {
  RouterModule
} from '@angular/router';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  AppComponent
} from './app.component';

import {
  AppRoutingModule
} from './app.route';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
