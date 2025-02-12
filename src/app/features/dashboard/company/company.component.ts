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
import { ReviewSummaryCardComponent } from '../../../shared/components/review-summary-card/review-summary-card.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [MatExpansionModule, ReviewCardComponent, ReviewSummaryCardComponent, AsyncPipe],
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

    // Initialize charts when company data is available
    if (this.stateService.company) {
      this.initializeCharts(this.stateService.company);
    }

    this.socket.on('newReviewOnCompany', (company: { message: string; data: ICompanyCardData }) => {
      if (company.data.id) {
        console.log(company);
        this.stateService.company = company.data;
        // Update charts when new review is received
        this.initializeCharts(company.data);
      }
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.socket.emit('joinCompany', params.get('id')?.toString());
      }
    });
  }

  private initializeCharts(companyData: ICompanyCardData): void {
    this.createReviewsTrendChart(companyData);
    this.createStarRatingsChart(companyData);
    this.createReviewsPieChart(companyData);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private groupReviewsByMonth(reviews: any[]): Map<string, number> {
    const monthlyReviews = new Map<string, number>();
    const months = [
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
    ];

    reviews.forEach((review) => {
      const date = new Date(review.timestamp);
      const monthKey = months[date.getMonth()];
      monthlyReviews.set(monthKey, (monthlyReviews.get(monthKey) || 0) + 1);
    });

    return monthlyReviews;
  }

  createReviewsTrendChart(companyData: ICompanyCardData): void {
    const months = [
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
    ];
    const monthlyReviews = this.groupReviewsByMonth(companyData.reviews);

    const reviewsTrendConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Monthly Reviews',
            data: months.map((month) => monthlyReviews.get(month) || 0),
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
          title: {
            display: true,
            text: 'Reviews Trend Over Time',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };

    const existingChart = Chart.getChart('reviewsTrendChart');
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart('reviewsTrendChart', reviewsTrendConfig);
  }

  createStarRatingsChart(companyData: ICompanyCardData): void {
    const ratings = [1, 2, 3, 4, 5];
    const ratingCounts = ratings.map(
      (rating) => companyData.reviews.filter((review) => review.rating === rating).length,
    );

    const starRatingsConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ratings.map((r) => `${r} Star${r !== 1 ? 's' : ''}`),
        datasets: [
          {
            label: 'Number of Ratings',
            data: ratingCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Rating Distribution',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };

    const existingChart = Chart.getChart('starRatingsChart');
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart('starRatingsChart', starRatingsConfig);
  }

  createReviewsPieChart(companyData: ICompanyCardData): void {
    const positiveReviews = companyData.reviews.filter((review) => review.rating >= 4).length;
    const negativeReviews = companyData.reviews.filter((review) => review.rating < 4).length;
    const total = positiveReviews + negativeReviews;

    const positivePct = ((positiveReviews / total) * 100).toFixed(1);
    const negativePct = ((negativeReviews / total) * 100).toFixed(1);

    const reviewsPieConfig: ChartConfiguration = {
      type: 'pie',
      data: {
        labels: [`Positive Reviews (${positivePct}%)`, `Negative Reviews (${negativePct}%)`],
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
          title: {
            display: true,
            text: 'Review Sentiment Distribution',
          },
        },
      },
    };

    const existingChart = Chart.getChart('reviewsPieChart');
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart('reviewsPieChart', reviewsPieConfig);
  }
}
