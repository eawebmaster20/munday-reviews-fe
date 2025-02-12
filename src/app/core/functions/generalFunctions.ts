//this file contains all reusable functions
import { Injectable } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class generalFunctions {
  constructor() {}

  convertDateToRelative(dateString: string): string {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  formatLongFullDateShort(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
