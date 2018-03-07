import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  private static baseUrl = '/api';
  private todoData: Array<Todo> = [];
  private todolist: BehaviorSubject<Array<Todo>> = new BehaviorSubject(this.todoData);


  constructor(private http: Http) {
    console.log('todo service');
  }
  getTodos(): Observable<Todo[]> {
    if (this.todolist) {
      return this.todolist;
    }
  }
  setTodos(todo: Todo) {
    this.todoData.push(todo)
    this.todolist.next(this.todoData);
  }

  removeTodos(id) {
    this.todoData = this.todoData.filter(item => item.id !== id);
    console.log('store data after delete:', this.todoData);
    this.todolist.next(this.todoData);
  }

  updateTodos(todo) {
    const itemIndex = this.todoData.findIndex(item => item.id === todo.id);
    this.todoData[itemIndex] = todo;
    console.log(this.todoData);
    this.todolist.next(this.todoData);
  }
}
