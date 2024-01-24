import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AnalysisComponent } from './analysis.component';
import { AnalysisService } from './shared/analysis.service';
import { Analysis } from './shared/analysis.model';

describe('a analysis component', () => {
	let component: AnalysisComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: AnalysisService, useClass: MockAnalysisService },
				AnalysisComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AnalysisComponent], (AnalysisComponent) => {
		component = AnalysisComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original analysis service
class MockAnalysisService extends AnalysisService {
	getList(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
