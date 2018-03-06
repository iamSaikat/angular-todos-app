import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { TodoListService } from 'app/services/todo-list.service';

@Component({
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  alltodolist: any;

  constructor(private service: TodoListService) { }

  ngOnInit() {
    this.todoForm = new FormGroup ({
      task: new FormControl(null , Validators.required),
    });
    this.service.getTodos()
    .subscribe( data => {this.alltodolist = data; });
  }

  randnum(): number {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  addTask(formData: any) {
    const setdata = {id: this.randnum(), text: formData.task, done: false};
    console.log(setdata);
    this.service.setTodos(setdata);
    this.todoForm.reset();
  }

  deleteTask (id: number): void {
    this.service.removeTodos(id);
  }
}
