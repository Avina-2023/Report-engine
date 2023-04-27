/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TinycardComponent } from './tinycard.component';

describe('TinycardComponent', () => {
  let component: TinycardComponent;
  let fixture: ComponentFixture<TinycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [TinycardComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
