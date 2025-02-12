import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { IAuthReqPayload } from '../../core/models/authReq.interface';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../../core/services/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isUserAuthenticated.asObservable();
  constructor(
    private api: ApiService,
    private router: Router,
    private stateService: StateService,
  ) {}
  login(payload: IAuthReqPayload, endpoint?: string) {
    return this.api.post(endpoint || 'auth/login', payload);
  }

  register(payload: IAuthReqPayload) {
    return this.api.post('auth/register', payload);
  }

  private hasToken(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAuthenticatedUser() {
    if (localStorage.getItem('tokent')) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token!);
      if (decodedToken.exp) {
        return decodedToken.exp * 1000 > Date.now();
      }
      this.setUserAuthenticated(false);
      return false;
    }
    this.setUserAuthenticated(false);
    return false;
  }

  setUserAuthenticated(isAuthenticated: boolean) {
    this.isUserAuthenticated.next(isAuthenticated);
  }

  logout() {
    localStorage.removeItem('token');
    this.isUserAuthenticated.next(false);
    this.stateService.setShowSidenav(false);
    this.router.navigate(['/auth/login']);
  }
}
