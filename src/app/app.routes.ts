import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/dashboard/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'reviews/create',
        loadComponent: () =>
          import('./features/dashboard/reviews/create/create.component').then(
            (m) => m.CreateComponent,
          ),
      },
      // {
      //   path: 'review/:id',
      //   loadComponent: () =>
      //     import('./features/dashboard/review/review-detail/review-detail.component').then(
      //       (m) => m.ReviewDetailComponent
      //     ),
      // },
      // {
      //   path: 'review/edit/:id',
      //   loadComponent: () =>
      //     import('./features/dashboard/review/review-edit/review-edit.component').then(
      //       (m) => m.ReviewEditComponent
      //     ),
      // },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
