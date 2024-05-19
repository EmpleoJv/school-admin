import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeaderboardComponent } from './teacher-leaderboard.component';

describe('TeacherLeaderboardComponent', () => {
  let component: TeacherLeaderboardComponent;
  let fixture: ComponentFixture<TeacherLeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherLeaderboardComponent]
    });
    fixture = TestBed.createComponent(TeacherLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
