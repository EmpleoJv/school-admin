import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCoinCollectedComponent } from './most-coin-collected.component';

describe('MostCoinCollectedComponent', () => {
  let component: MostCoinCollectedComponent;
  let fixture: ComponentFixture<MostCoinCollectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostCoinCollectedComponent]
    });
    fixture = TestBed.createComponent(MostCoinCollectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
