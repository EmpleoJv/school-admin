import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentsHighScoreComponent } from './all-students-high-score.component';

describe('AllStudentsHighScoreComponent', () => {
  let component: AllStudentsHighScoreComponent;
  let fixture: ComponentFixture<AllStudentsHighScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllStudentsHighScoreComponent]
    });
    fixture = TestBed.createComponent(AllStudentsHighScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
