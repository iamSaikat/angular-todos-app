import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Todo} from '../../models/todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnDestroy, OnInit {
  alltodolist: Array<Todo>;
  completedTodos: number;
  activeTodos: number;
  private serviceSubscription: Subscription;

  constructor(private service: TodoService) { }

  getTodoList() {
    this.serviceSubscription = this.service.getTodos()
    .subscribe( data => {this.alltodolist = data; });
  }

  ngOnInit() {
    this.getTodoList();
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
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
