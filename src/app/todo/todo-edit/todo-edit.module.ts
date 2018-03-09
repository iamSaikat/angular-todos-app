import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  TodoEditRoutingModule
} from './todo-edit-routing.module';
import {
  TodoEditComponent
} from './todo-edit.component';

@NgModule({
  imports: [
    CommonModule,
    TodoEditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoEditComponent
  ]
})
export class TodoEditModule {}
