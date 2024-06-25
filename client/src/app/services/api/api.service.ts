import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = 'http://localhost:5173/api/v1';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  post<T1, T2>(endpoint: string, data: T1): Observable<T2> {
    return this.http.post<T2>(`${this.baseUrl}${endpoint}`, data);
  }

  put<T1, T2>(endpoint: string, data: T1): Observable<T2> {
    return this.http.put<T2>(`${this.baseUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}
