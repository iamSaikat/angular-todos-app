import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoService } from 'app/todo/todo.service';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ApiBaseService } from './../service/api-base.service';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  providers : [
    TodoService
  ]
})
export class TodoModule { }
