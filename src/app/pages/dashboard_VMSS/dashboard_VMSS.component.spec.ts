/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dashboard_VMSSComponent } from './dashboard_VMSS.component';

describe('Dashboard_VMSSComponent', () => {
  let component: Dashboard_VMSSComponent;
  let fixture: ComponentFixture<Dashboard_VMSSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [Dashboard_VMSSComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard_VMSSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
