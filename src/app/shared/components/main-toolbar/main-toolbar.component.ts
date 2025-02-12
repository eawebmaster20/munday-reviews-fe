import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { StateService } from '../../../core/services/state/state.service';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
})
export class MainToolbarComponent {
  constructor(
    public authService: AuthService,
    public stateService: StateService,
    private router: Router,
  ) {}

  loginAsBusiness() {
    this.stateService.companyAuthentication = true;
    this.logout();
    this.router.navigate(['/auth/login'], { queryParams: { company: true } });
  }
  logout() {
    this.authService.logout();
  }
}
