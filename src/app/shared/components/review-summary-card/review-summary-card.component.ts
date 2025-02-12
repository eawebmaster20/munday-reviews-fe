import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-review-summary-card',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './review-summary-card.component.html',
  styleUrl: './review-summary-card.component.scss',
})
export class ReviewSummaryCardComponent {
  // @Input() data
}
