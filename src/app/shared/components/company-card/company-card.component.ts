import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ICompanyCardData } from '../../../core/models/companycard.interface';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../../../core/services/state/state.service';

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

  constructor(private stateService: StateService) {}
  handleClick() {
    this.clickEvent.emit(this.data);
  }

  ngOnInit(): void {
    this.data.averageRating = this.stateService.calculateAverageRating(this.data.reviews);
  }
}
