import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { AuthService } from '../../../features/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, StarRatingComponent, AsyncPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private toastr: ToastrService,
    public authService: AuthService,
  ) {}
  showAddReview() {
    if (!this.authService.isAuthenticatedUser()) {
      console.log('Please login');
      this.toastr.error('Please login to add a review', 'Access denied');
    }
  }
}
