import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ICompanyCardData } from '../../../core/models/companycard.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [MatCardModule, StarRatingComponent, MatButtonModule],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss',
})
export class CompanyCardComponent {
  @Input() data!: ICompanyCardData;
  @Output() clickEvent: EventEmitter<ICompanyCardData> = new EventEmitter<ICompanyCardData>();

  handleClick() {
    this.clickEvent.emit(this.data);
  }
}
