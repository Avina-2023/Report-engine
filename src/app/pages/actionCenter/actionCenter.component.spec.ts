import { TestBed, inject } from '@angular/core/testing';

import { ActionCenterComponent } from './actionCenter.component';

describe('a actionCenter component', () => {
	let component: ActionCenterComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ActionCenterComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ActionCenterComponent], (ActionCenterComponent) => {
		component = ActionCenterComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});
