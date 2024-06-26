import { Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public clients = signal([]);
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(private readonly apiService: ApiService) {}

  getAll() {
    this.apiService.get('/client').subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }

  getNextPage() {
    this.apiService
      .get(`/client?pageSize=${this.pageSize}&pageNumber=${++this.pageNumber}`)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }

  getPreviousPage() {
    this.apiService
      .get(`/client?pageSize=${this.pageSize}&pageNumber=${--this.pageNumber}`)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
}
