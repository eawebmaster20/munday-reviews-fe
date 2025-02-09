import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './main-toolbar.component.html',
  styleUrl: './main-toolbar.component.scss',
})
export class MainToolbarComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
