import { TodoEditComponent } from './todo-edit/todo-edit.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {TodoListService} from './services/todo-list.service';
import {appRoutes} from './app.route'
import { TodoFormComponent } from 'app/todo-form/todo-form.component';
import { TodoListComponent } from 'app/todo-list/todo-list.component';
import { DoneListComponent } from 'app/done-list/done-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    DoneListComponent,
    TodoEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
