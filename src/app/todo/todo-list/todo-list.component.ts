import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Todo} from '../../models/todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  alltodolist: Array<Todo>;
  completedTodos: number;
  activeTodos: number;

  constructor(private service: TodoService) { }

  getTodoList() {
    this.service.getTodos()
    .subscribe( data => {this.alltodolist = data; });
  }

  ngOnInit() {
    this.getTodoList();
  }

  deleteTask (id: number): void {
    this.service.removeTodos(id);
  }
  todoDone(todo) {
    todo.done = !todo.done;
    console.log(todo);
    this.service.updateTodos(todo);
  }
}
