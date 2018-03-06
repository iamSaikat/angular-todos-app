import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router/';
import { TodoListService } from 'app/services/todo-list.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  id: number;
  taskdetails: any;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private service: TodoListService
  ) {}

  ngOnInit() {
    this.activeroute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.service.getTodos().subscribe(data => {
        this.taskdetails = data.filter(item => item.id === this.id);
        console.log('Task Details', this.taskdetails);
      });
      if (this.taskdetails) {
        this.todoForm = new FormGroup({
          task: new FormControl(this.taskdetails[0].text, Validators.required)
        });
      }
    });
  }
  updateTask(todoname) {
    console.log(todoname);
    const updatedata = {id: this.id, text: todoname.task, done: false}
    this.service.updateTodos(updatedata);
    this.router.navigate(['/todolist']);
  }
}
