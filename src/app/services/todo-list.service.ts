import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TodoListService {
  private static baseUrl = '/api';
  private todolist = [];
  // private todolist: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private http: Http) {}
  getTodos() {
    if (this.todolist) {
      return Observable.of(this.todolist);
    }
  }
  setTodos(todo: any) {
    this.todolist.push(todo);
    console.log('store data:', this.todolist);
  }

  removeTodos(id) {
    this.todolist = this.todolist.filter(item => item.id !== id);
    console.log('store data after delete:', this.todolist);
  }

  updateTodos(todo) {
    this.todolist.find(item => item.id === todo.id).text = todo.text;
    this.todolist.find(item => item.id === todo.id).done = todo.done;
    console.log(this.todolist);
  }
}
