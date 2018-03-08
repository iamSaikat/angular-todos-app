import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router/';
import { TodoService } from '../todo.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  id: number;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private service: TodoService
  ) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      task: new FormControl('', Validators.required)
    });

    this.activeroute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.service.getTodo(this.id)
      .subscribe(data => {
        console.log('Task Details', data);
        this.todoForm.patchValue({
          task : data.text
        });
      });
    });
  }
  updateTask(todoname) {
    console.log(todoname);
    const updatedata = {id: this.id, text: todoname.task, done: false};
    this.service.updateTodos(updatedata);
    this.router.navigate(['/home']);
  }
}
