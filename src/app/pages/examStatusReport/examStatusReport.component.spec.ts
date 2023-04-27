/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExamStatusReportComponent } from './examStatusReport.component';

describe('ExamStatusReportComponent', () => {
  let component: ExamStatusReportComponent;
  let fixture: ComponentFixture<ExamStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ExamStatusReportComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
