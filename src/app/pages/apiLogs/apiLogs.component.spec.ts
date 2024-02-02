import { TestBed, inject } from '@angular/core/testing';

import { ApiLogsComponent } from './apiLogs.component';

describe('a apiLogs component', () => {
	let component: ApiLogsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ApiLogsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ApiLogsComponent], (ApiLogsComponent) => {
		component = ApiLogsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});