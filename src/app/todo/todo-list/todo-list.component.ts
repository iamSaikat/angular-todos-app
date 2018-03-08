import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges,
  SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Todo} from '../../models/todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnChanges, OnDestroy {
  alltodolist: any;
  completedTodos: number;
  activeTodos: number;
  private serviceSubscription: Subscription;

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.alltodolist = this.service.todos; // subscribe
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnDestroy() {
    // this.serviceSubscription.unsubscribe();
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
