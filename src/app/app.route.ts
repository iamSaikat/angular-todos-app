import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoFormComponent } from 'app/todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DoneListComponent } from './done-list/done-list.component';
import {Routes} from '@angular/router';



export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: TodoFormComponent
  },
  {
    path: 'todolist',
    component: TodoListComponent
  },
  {
    path: 'edit/:id',
    component: TodoEditComponent
  }
];

