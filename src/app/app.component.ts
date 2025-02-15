import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainToolbarComponent } from './shared/components/main-toolbar/main-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StateService } from './core/services/state/state.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainToolbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mundayReviews';
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard/home' },
    { label: 'Tasks', icon: 'task' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Profile', icon: 'person' },
  ];
  constructor(
    public state: StateService,
    public authService: AuthService,
  ) {
    // console.log(state.getStateItem('showSidenav'));
  }
}
