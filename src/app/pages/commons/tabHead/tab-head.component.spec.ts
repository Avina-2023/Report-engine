import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabHeadComponent } from './tab-head.component';

describe('TabHeadComponent', () => {
  let component: TabHeadComponent;
  let fixture: ComponentFixture<TabHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabHeadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
