/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string, baseUrl?: string, params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = new HttpParams({ fromObject: params });
    }

    if (baseUrl) {
      return this.http.get(`${baseUrl}/${path}`, {
        params: httpParams.keys().length ? httpParams : undefined,
      }) as Observable<any>;
    }

    return this.http.get(`${environment.apiUrl}/${path}`, {
      params: httpParams.keys().length ? httpParams : undefined,
    }) as Observable<any>;
  }

  post<T>(path: string, payload: T, baseUrl?: string, params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = new HttpParams({ fromObject: params });
    }
    if (baseUrl) {
      return this.http.post(`${baseUrl}/${path}`, payload, {
        params: httpParams.keys().length ? httpParams : undefined,
      });
    }
    return this.http.post(`${environment.apiUrl}/${path}`, payload, {
      params: httpParams.keys().length ? httpParams : undefined,
    }) as Observable<any>;
  }

  put<T>(path: string, payload: T, params?: any, baseUrl?: string): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = new HttpParams({ fromObject: params });
    }
    if (baseUrl) {
      return this.http.put(`${baseUrl}/${path}/${params}`, payload, {
        params: httpParams.keys().length ? httpParams : undefined,
      });
    }
    return this.http.put(`${environment.apiUrl}/${path}/${params}`, payload, {
      params: httpParams.keys().length ? httpParams : undefined,
    }) as Observable<any>;
  }

  delete<T>(path: string, id: T, baseUrl?: string, params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      httpParams = new HttpParams({ fromObject: params });
    }
    if (baseUrl) {
      return this.http.delete(`${baseUrl}/${path}/${id}`, {
        params: httpParams.keys().length ? httpParams : undefined,
      });
    }
    return this.http.delete(`${environment.apiUrl}/${path}/${id}`, {
      params: httpParams.keys().length ? httpParams : undefined,
    }) as Observable<any>;
  }
}
