import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainToolbarComponent } from './shared/components/main-toolbar/main-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mundayReviews';
}
