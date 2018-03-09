import { ServerResponse } from './../models/server-response';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  todos: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;
  private dataStore: {
    todos: Todo[]
  };

  private _report: BehaviorSubject<Object> = new BehaviorSubject({});
  report = this._report.asObservable();

  constructor(
    private http: HttpClient
  ) {
    console.log('todo service');
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }
  getAllTodos() {
    this.http.get('todos')
    .map((response) => response )
    .catch(err => Observable.throw(err))
    .subscribe(data => {
      this.dataStore.todos = data;
      this._todos.next(Object.assign({}, this.dataStore).todos);
      this.getReport(this._todos.getValue());
    }, error => console.log('Could not load todos.'));
  }

  getTodo(id: number) {
    return this.http.get('todos/' + id)
    .map((response) => response )
    .catch(err => Observable.throw(err));
  }

  createTodos(todo) {
    return this.http.post('todos', todo)
    .map( response => response )
    .catch(err => Observable.throw(err))
    .subscribe(data => {
      this.dataStore.todos.push(data);
      this._todos.next(Object.assign({}, this.dataStore).todos);
      this.getReport(this._todos.getValue());
    }, error => console.log('Could not create todo.'));
  }

  removeTodos(id) {
    this.http.delete<ServerResponse>('todos/' + id)
    .map( response => response )
    .catch(err => Observable.throw(err))
    .subscribe(response => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === id) { this.dataStore.todos.splice(i, 1); }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
      this.getReport(this._todos.getValue());
    }, error => console.log('Could not delete todo.'));
  }

  updateTodos(todo) {
    this.http.put<ServerResponse>('todos/' + todo.id, todo)
    .map( response => response )
    .catch(err => Observable.throw(err))
    .subscribe(data => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === data.id) { this.dataStore.todos[i] = data; }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
      this.getReport(this._todos.getValue());
    }, error => console.log('Could not update todo.'));
  }

  getReport(todos) {
    const report = {
      completed: 0,
      active: 0
    };
    todos.map(v => {
      v.done ? report.completed ++ : report.active ++;
    });
    this._report.next(report);
  }
}
