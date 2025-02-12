import { Component, inject, OnInit } from '@angular/core';
import { CompanyCardComponent } from '../../../shared/components/company-card/company-card.component';
import { ICompanyCardData } from '../../../core/models/companycard.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '../../../core/services/state/state.service';
import { ApiService } from '../../../core/services/api/api.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../core/pipes/filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CompanyCardComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    FilterPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  companies: ICompanyCardData[] = [];

  dialog = inject(MatDialog);
  constructor(
    public stateService: StateService,
    private api: ApiService,
    private router: Router,
  ) {}

  viewCompany(company: ICompanyCardData) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: company,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.api
      .get('companies')
      .pipe(take(1))
      .subscribe({
        next: (companies) => {
          this.stateService.setCompanies(companies);
          this.loadData();
        },
        error: (error) => {
          console.error('Error retrieving company cards', error);
        },
      });
  }
  loadData() {
    this.stateService.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
        // console.log(companies);
      },
      error: (error) => {
        console.error('Error retrieving company cards', error);
      },
    });
  }

  toggleFilterVar(param: string) {
    if (param === 'date') {
      this.stateService.sortByDate = !this.stateService.sortByDate;
    }
    if (param === 'rating') {
      this.stateService.sortByRating = !this.stateService.sortByRating;
    }
  }
}
