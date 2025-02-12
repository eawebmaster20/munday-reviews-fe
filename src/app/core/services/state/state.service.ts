/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICompanyCardData, IReview } from '../../models/companycard.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  searchTerm: string = '';
  sortByRating: boolean = false;
  sortByDate: boolean = false;
  companyAuthentication: boolean = false;
  company: ICompanyCardData = {
    id: 0,
    name: '',
    logoUrl: '',
    reviewsCount: 0,
    reviews: [],
    description: '',
    averageRating: 0,
    readonly: false,
  };
  private showSidenav$ = new BehaviorSubject<boolean>(true);
  private reviewObj$ = new BehaviorSubject<any>({
    companyId: 3,
    name: 'Amazon',
  });
  private companies$ = new BehaviorSubject<ICompanyCardData[]>([]);

  getShowSidenav() {
    return this.showSidenav$.asObservable();
  }

  setCompanies(companies: ICompanyCardData[]) {
    this.companies$.next(companies);
  }
  getCompanies() {
    return this.companies$.asObservable();
  }

  setShowSidenav(value: boolean) {
    this.showSidenav$.next(value);
  }

  getReviewObj() {
    return this.reviewObj$.asObservable();
  }

  updateReviewObj(data: any) {
    const currentObj = this.reviewObj$.getValue();
    const updatedObj = {
      ...currentObj,
      ...data,
    };
    this.reviewObj$.next(updatedObj);
  }

  calculateAverageRating(reviews: IReview[]): number {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews.length;
    return averageRating;
  }

  removeReviewObjKey(key: string) {
    const currentObj = this.reviewObj$.getValue();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...newObj } = currentObj;
    this.reviewObj$.next(newObj);
  }
}
