/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private data: any = {
    showSidenav: true,
  };
  constructor() {}
  // Add state management methods here, e.g., get, set, etc.
  private state = new BehaviorSubject<any>(this.data);
  getState() {
    return this.state.asObservable();
  }

  setStateItem(item: any) {
    this.data[item.key] = item.value;
    this.state.next(this.data);
  }

  getStateItem(key: string) {
    return this.data[key];
  }

  removeStateItem(key: string) {
    delete this.data[key];
    this.state.next(this.data);
  }
}
