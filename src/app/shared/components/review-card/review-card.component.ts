import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReview } from '../../../core/models/companycard.interface';
import { MatDividerModule } from '@angular/material/divider';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { generalFunctions } from '../../../core/functions/generalFunctions';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [MatDividerModule, StarRatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() data!: IReview;
  @Input() isAuthenticated!: boolean | null;
  @Output() deleteReview = new EventEmitter();
  @Output() editReview = new EventEmitter();

  constructor(public functions: generalFunctions) {}

  deleteReviewHandler() {
    this.deleteReview.emit(this.data.id);
  }

  editReviewHandler() {
    this.editReview.emit(this.data);
  }
}
