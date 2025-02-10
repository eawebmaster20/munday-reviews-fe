/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';
import { HttpRes } from '../models/httpRes.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const api = environment.apiUrl;
  const loginUrl = `${api}/auth/login`;

  if (localStorage.getItem('token') && req.url !== loginUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && req.url === loginUrl) {
        const token = (event.body as HttpRes<any>)?.data['token'];
        const user = (event.body as HttpRes<any>)?.data['user'];
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    }),
  );
};
