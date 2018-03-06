import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Todo} from '../models/todo';
import {TodoListService} from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  alltodolist: any;
  completedTodos: number;
  activeTodos: number;

  constructor(private service: TodoListService) { }

  todosReport (data) {
    this.activeTodos = data.filter(v => v.done === false).length;
    this.completedTodos = data.filter(v => v.done === true).length;
  }

  ngOnInit() {
    this.service.getTodos()
    .subscribe( data => {this.alltodolist = data; this.todosReport(this.alltodolist); });
  }
  refreshTodoList() {
    this.service.getTodos()
    .subscribe( data => {this.alltodolist = data; });
    this.todosReport(this.alltodolist);
  }
  deleteTask (id: number): void {
    this.service.removeTodos(id);
    this.refreshTodoList();
  }
  todoDone(todo) {
    todo.done = !todo.done;
    console.log(todo);
    this.service.updateTodos(todo);
    this.refreshTodoList();
  }
}
