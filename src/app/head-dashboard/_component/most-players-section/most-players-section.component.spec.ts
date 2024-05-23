import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayersSectionComponent } from './most-players-section.component';

describe('MostPlayersSectionComponent', () => {
  let component: MostPlayersSectionComponent;
  let fixture: ComponentFixture<MostPlayersSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostPlayersSectionComponent]
    });
    fixture = TestBed.createComponent(MostPlayersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
