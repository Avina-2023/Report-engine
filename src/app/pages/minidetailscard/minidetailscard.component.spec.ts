/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MinidetailscardComponent } from './minidetailscard.component';

describe('MinidetailscardComponent', () => {
  let component: MinidetailscardComponent;
  let fixture: ComponentFixture<MinidetailscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [MinidetailscardComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinidetailscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
