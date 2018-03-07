import { TestBed, inject } from '@angular/core/testing';

import { TodoEditComponent } from './todo-edit.component';

describe('a todo-edit component', () => {
	let component: TodoEditComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TodoEditComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TodoEditComponent], (TodoEditComponent) => {
		component = TodoEditComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});