/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProctorComponent } from './proctor.component';

describe('ProctorComponent', () => {
  let component: ProctorComponent;
  let fixture: ComponentFixture<ProctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
