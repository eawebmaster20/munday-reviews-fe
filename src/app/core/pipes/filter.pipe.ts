import { Pipe, PipeTransform } from '@angular/core';
import { ICompanyCardData } from '../models/companycard.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    value: ICompanyCardData[],
    searchTerm: string = '',
    sortByDate: boolean = false,
    sortByRating: boolean = false,
  ): ICompanyCardData[] {
    if (!value) return [];

    const filtered = value.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortByDate && sortByRating) {
      return filtered
        .sort((a, b) => b.averageRating - a.averageRating)
        .sort((a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
    }

    if (sortByDate) {
      return filtered.sort(
        (a, b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime(),
      );
    }

    if (sortByRating) {
      return filtered.sort((a, b) => b.averageRating - a.averageRating);
    }

    return filtered;
  }
}
