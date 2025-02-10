import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() step: number = 1;
  @Input() id: number = 1;
  @Input() maxRating: number = 5;
  @Input() disabled: boolean = false;
  @Input() color: string = 'primary';
  @Input() size: string = 'medium';
  @Input() showText: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() showHalfStars: boolean = false;
  @Input() width: string = '100%';
  @Input() bgColor: string = 'transparent';
  @Output() valueChange = new EventEmitter();
  log(data: number, event: Event) {
    event.stopPropagation();
    if (this.readOnly) {
      console.log('READ ONLY');
      return;
    }
    // console.log('not READ ONLY', data, this.readOnly);
    this.valueChange.emit(data);
    this.rating = data;
  }
}
