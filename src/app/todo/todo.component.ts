import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoService } from './todo.service';


@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  alltodolist: Array<Todo>;
  formValidError = false;
  completedTodos: number;
  activeTodos: number;

  todosReport () {
    this.activeTodos = this.alltodolist.filter(v => v.done === false).length;
    this.completedTodos = this.alltodolist.filter(v => v.done === true).length;
  }

  constructor(
    private service: TodoService,
    private router: Router
  ) { }

  getTodoList() {
    this.service.getTodos()
    .subscribe( data => {this.alltodolist = data;
      this.todosReport();
      console.log(data);
    });
  }

  ngOnInit() {
    this.todoForm = new FormGroup ({
      task: new FormControl(null , Validators.required),
    });
    this.getTodoList();
  }

  randnum(): number {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  addTask(formData: any) {
    if (formData.task != null) {
    const setdata = {id: this.randnum(), text: formData.task, done: false};
    console.log(setdata);
    this.service.setTodos(setdata);
    this.formValidError = false;
    // this.getTodoList();
    this.todoForm.reset();
    this.router.navigate(['/home']);
    } else {
      this.formValidError = true;
    }
  }
}
