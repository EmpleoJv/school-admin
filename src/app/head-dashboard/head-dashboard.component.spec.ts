import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDashboardComponent } from './head-dashboard.component';

describe('HeadDashboardComponent', () => {
  let component: HeadDashboardComponent;
  let fixture: ComponentFixture<HeadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
