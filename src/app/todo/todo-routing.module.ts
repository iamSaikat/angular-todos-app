import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  TodoComponent
} from './todo.component';
import {
  TodoListComponent
} from './todo-list/todo-list.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TodoComponent,
    children: [{
        path: 'list',
        component: TodoListComponent
      },
      {
        path: 'edit',
        loadChildren: './todo-edit/todo-edit.module#TodoEditModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
