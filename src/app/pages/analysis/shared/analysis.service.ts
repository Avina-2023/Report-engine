import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Analysis } from './analysis.model';

@Injectable()
export class AnalysisService {

	constructor(private http: Http) { }

	getList(): Observable<Analysis[]> {
		return this.http.get('/api/list').map(res => res.json() as Analysis[]);
	}
}