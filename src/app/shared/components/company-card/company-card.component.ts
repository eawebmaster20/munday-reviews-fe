import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ICompanyCardData, IReview } from '../../../core/models/companycard.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [MatCardModule, StarRatingComponent, MatButtonModule],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss',
})
export class CompanyCardComponent implements OnInit {
  @Input() data!: ICompanyCardData;
  @Output() clickEvent: EventEmitter<ICompanyCardData> = new EventEmitter<ICompanyCardData>();

  handleClick() {
    this.clickEvent.emit(this.data);
  }

  calculateAverageRating(reviews: IReview[]): number {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews.length;
    return averageRating;
  }

  ngOnInit(): void {
    this.data.averageRating = this.calculateAverageRating(this.data.reviews);
  }
}
