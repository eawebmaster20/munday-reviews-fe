import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ICompanyCardData } from '../../../core/models/companycard.interface';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [MatCardModule, StarRatingComponent],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss',
})
export class CompanyCardComponent {
  @Input() data!: ICompanyCardData;
}
