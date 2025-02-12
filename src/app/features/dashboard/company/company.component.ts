import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatExpansionModule } from '@angular/material/expansion';
import { io, Socket } from 'socket.io-client';
import { ICompanyCardData } from '../../../core/models/companycard.interface';
import { ActivatedRoute } from '@angular/router';
import { ReviewCardComponent } from '../../../shared/components/review-card/review-card.component';
import { AuthService } from '../../auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { StateService } from '../../../core/services/state/state.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [MatExpansionModule, ReviewCardComponent, AsyncPipe],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  private socket: Socket;
  panelOpenState = false;
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public stateService: StateService,
  ) {
    this.socket = io('http://localhost:5000');
  }
  ngOnInit(): void {
    Chart.register(...registerables);
    this.createReviewsTrendChart();
    this.createStarRatingsChart();
    this.createReviewsPieChart();
    this.socket.on('newReviewOnCompany', (company: { message: string; data: ICompanyCardData }) => {
      if (company.data.id) {
        console.log(company);
        this.stateService.company = company.data;
      }
    });
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.socket.emit('joinCompany', params.get('id')?.toString());
      }
    });
  }

  createReviewsTrendChart(): void {
    const reviewsTrendConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Monthly Reviews',
            data: [10, 15, 8, 20, 25, 30, 18, 24, 35, 40, 28, 50],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
      },
    };

    new Chart('reviewsTrendChart', reviewsTrendConfig);
  }

  createStarRatingsChart(): void {
    const starRatingsConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
          {
            label: 'Number of Ratings',
            data: [5, 8, 12, 40, 70],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    new Chart('starRatingsChart', starRatingsConfig);
  }

  createReviewsPieChart(): void {
    const positiveReviews = 110;
    const negativeReviews = 25;

    const reviewsPieConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: ['Positive Reviews (4-5 Stars)', 'Negative Reviews (1-3 Stars)'],
        datasets: [
          {
            data: [positiveReviews, negativeReviews],
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
            hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    };

    new Chart('reviewsPieChart', reviewsPieConfig);
  }
}
