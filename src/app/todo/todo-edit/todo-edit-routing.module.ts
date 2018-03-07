import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoEditComponent } from './todo-edit.component';

const routes: Routes = [
  {
    path: ':id',
    component: TodoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoEditRoutingModule { }
