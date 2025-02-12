import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { AuthService } from '../../../features/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { StateService } from '../../../core/services/state/state.service';
import { MatDividerModule } from '@angular/material/divider';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { IReview } from '../../../core/models/companycard.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    StarRatingComponent,
    AsyncPipe,
    MatDividerModule,
    ReviewCardComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private toastr: ToastrService,
    public authService: AuthService,
    private router: Router,
    private stateService: StateService,
    private dialogRef: MatDialogRef<ModalComponent>,
  ) {}
  showAddReview() {
    this.router.navigate(['dashboard/reviews/create']);
    const data = { companyId: this.data.id, name: this.data.name };
    this.stateService.updateReviewObj({ ...data });
    console.log(this.stateService.getReviewObj());
    this.dialogRef.close();
  }

  deleteReview(id: string) {
    this.dialogRef.close(id);
  }

  editReview(payload: IReview) {
    this.router.navigate(['/dashboard/reviews/create'], {
      state: payload,
    });
    this.dialogRef.close();
  }
}
