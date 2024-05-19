import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadLeaderboardComponent } from './head-leaderboard.component';

describe('HeadLeaderboardComponent', () => {
  let component: HeadLeaderboardComponent;
  let fixture: ComponentFixture<HeadLeaderboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadLeaderboardComponent]
    });
    fixture = TestBed.createComponent(HeadLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
