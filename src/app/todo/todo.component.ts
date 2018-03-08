import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoService } from './todo.service';



@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnDestroy, OnInit {
  todoForm: FormGroup;
  alltodolist: Observable<any>;
  formValidError = false;
  report: any;
  private serviceSubscription: Subscription;

  constructor(
    private service: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.todoForm = new FormGroup ({
      task: new FormControl(null , Validators.required),
    });
    this.alltodolist = this.service.todos; // subscribe

    this.service.getAllTodos();
    this.service.report.subscribe(res => {
      this.report = res;
    });
  }

  ngOnDestroy() {
    // this.serviceSubscription.unsubscribe();
  }

  addTask(formData: any) {
    if (formData.task != null) {
    const setdata = {'text': formData.task, 'done': false};
    this.service.createTodos(setdata);
    this.formValidError = false;
    this.todoForm.reset();
    this.router.navigate(['/home']);
    } else {
      this.formValidError = true;
    }
  }
}
