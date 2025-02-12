import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSummaryCardComponent } from './review-summary-card.component';

describe('ReviewSummaryCardComponent', () => {
  let component: ReviewSummaryCardComponent;
  let fixture: ComponentFixture<ReviewSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
