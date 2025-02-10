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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CompanyCardComponent, MatInputModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  companies: ICompanyCardData[] = [];
  dialog = inject(MatDialog);
  constructor(
    private stateService: StateService,
    private api: ApiService,
  ) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  viewCompany(company: ICompanyCardData) {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   data: company,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
    this.dialog.open(ModalComponent, {
      data: company,
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
        console.log(companies);
      },
      error: (error) => {
        console.error('Error retrieving company cards', error);
      },
    });
  }
}
