import { Component, inject } from '@angular/core';
import { CompanyCardComponent } from '../../../shared/components/company-card/company-card.component';
import { ICompanyCardData } from '../../../core/models/companycard.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CompanyCardComponent, MatInputModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  companies: ICompanyCardData[] = [
    {
      id: 1,
      info: 'google.com',
      name: 'Google',
      logoUrl: 'assets/logo.png',
      reviewsCount: 1000,
      averageRating: 3,
      readonly: false,
    },
    {
      id: 2,
      info: 'facebook.com',
      name: 'Facebook',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 4,
      readonly: false,
    },
    {
      id: 3,
      info: 'aws.com',
      name: 'Amazon',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 3,
      readonly: false,
    },
    {
      id: 4,
      info: 'x.com',
      name: 'Tweeter',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 1,
      readonly: false,
    },
    {
      id: 5,
      info: 'facebook.com',
      name: 'Facebook',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 4,
      readonly: false,
    },
    {
      id: 6,
      info: 'd.sdt.com',
      name: 'Facebook',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 5,
      readonly: false,
    },
    {
      id: 7,
      info: 'noye.com',
      name: 'Facebook',
      logoUrl: 'assets/logo.png',
      reviewsCount: 2000,
      averageRating: 2,
      readonly: false,
    },
  ];
  dialog = inject(MatDialog);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  viewCompany(company: ICompanyCardData) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: company,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
