import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReview } from '../../../core/models/companycard.interface';
import { MatDividerModule } from '@angular/material/divider';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { generalFunctions } from '../../../core/functions/generalFunctions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../../../core/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [MatDividerModule, StarRatingComponent, MatIconModule, MatButtonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() data!: IReview;
  @Input() isAuthenticated!: boolean | null;
  @Output() deleteReview = new EventEmitter();
  @Output() editReview = new EventEmitter();

  constructor(
    private router: Router,
    public functions: generalFunctions,
    private api: ApiService,
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log(this.data);
  //   this.hasAuthority()
  //   if(changes && this.data) {
  //     if (localStorage.getItem('token')) {
  //       const token = localStorage.getItem('token');
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const decodedToken = jwtDecode(token!) as any;
  //       console.log(decodedToken['id'], this.data);
  //     }
  //   }
  // }

  hasAuthority() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken = jwtDecode(token!) as any;
      // console.log(decodedToken['id'], this.data.userId);
      return decodedToken['id'] === this.data.userId;
    }
    return false;
  }

  deleteReviewHandler(id: number) {
    this.api.delete('reviews', id).subscribe({
      next: (res) => {
        console.log(res);
        this.deleteReview.emit(this.data.id);
      },
      error: (error) => {
        console.error('Error deleting review', error);
      },
    });
  }

  editReviewHandler(payload: IReview) {
    this.editReview.emit(payload);
  }
}
