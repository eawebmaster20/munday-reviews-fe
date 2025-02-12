import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StateService } from '../../../../core/services/state/state.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { ApiService } from '../../../../core/services/api/api.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    StarRatingComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  reviewForm!: FormGroup;
  rating: number = 0;
  companyId: number = 0;
  userId: number | null = null;
  name: string = '';
  updateMode: boolean = false;
  reviewId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public stateService: StateService,
    private api: ApiService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state = navigation?.extras.state as any;

    if (state) {
      console.log(state);
      this.reviewForm = this.fb.group({
        title: [state.title],
        content: [state.content, Validators.required],
        companyId: [state.companyId, Validators.required],
        userId: [state.userId, Validators.required],
        rating: [state.rating, [Validators.min(1), Validators.max(5)]],
      });
      this.rating = state.rating;
      this.updateMode = true;
      this.reviewId = state.id;
    } else {
      this.reviewForm = this.fb.group({
        title: [''],
        content: ['', Validators.required],
        companyId: [this.companyId, Validators.required],
        userId: [this.userId, Validators.required],
        rating: [this.rating, [Validators.min(1), Validators.max(5)]],
      });
    }
  }

  submitReview() {
    console.log(this.reviewForm.value);
    if (this.updateMode) {
      this.api.put('reviews', this.reviewForm.value, this.reviewId).subscribe({
        next: () => {
          this.reviewForm.reset();
          this.router.navigate(['/dashboard/home']);
        },
        error: (error) => {
          console.error('Error creating review', error);
        },
      });
    } else {
      this.api.post('reviews', this.reviewForm.value).subscribe({
        next: () => {
          this.reviewForm.reset();
          this.router.navigate(['/dashboard/home']);
        },
        error: (error) => {
          console.error('Error creating review', error);
        },
      });
    }
  }

  updateRating(rating: number) {
    this.rating = rating;
    console.log(this.rating);
    this.reviewForm.patchValue({ rating: this.rating });
  }

  ngOnInit(): void {
    this.stateService.getReviewObj().subscribe({
      next: (review) => {
        if (!review.companyId) {
          this.router.navigate(['/dashboard/home']);
        }
        this.companyId = review.companyId;
        this.name = review.name;
      },
      error: (error) => {
        console.error('Error retrieving review object', error);
      },
    });
    const user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
    } else {
      this.router.navigate(['/dashboard/home']);
    }
  }
}
