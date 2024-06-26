import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  pageSize: number = 3;
  pageNumber: number = 1;

  constructor(private readonly apiService: ApiService) {}

  getAll() {
    return this.apiService.get(
      `/client?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
    );
  }

  getNextPage() {
    return this.apiService.get(
      `/client?pageSize=${this.pageSize}&pageNumber=${++this.pageNumber}`
    );
  }

  getPreviousPage() {
    return this.apiService.get(
      `/client?pageSize=${this.pageSize}&pageNumber=${--this.pageNumber}`
    );
  }
}
