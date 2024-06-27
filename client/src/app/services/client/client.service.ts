import { Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import {
  TClientDTO,
  TPostClientDTO,
  TPutClientDTO,
} from '../../types/dtos/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  names = signal([
    'الرقم',
    'الاسم',
    'التوصيف',
    'الإقامة',
    'المدخل',
    'التاريخ',
    'المعدل',
    'اليوم',
  ]);
  columns = signal([
    'id',
    'name',
    'description',
    'address',
    'createdBy',
    'createdOn',
    'updatedBy',
    'updatedOn',
  ]);
  pageSize: number = 3;
  pageNumber: number = 1;
  totalCount: number = 3;
  totalPages: number = 1;

  constructor(private readonly apiService: ApiService) {}

  getAll() {
    this.pageNumber = 1;
    this.pageSize = 3;
    return this.apiService.get<TClientDTO>(
      `/client?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
    );
  }

  getNextPage() {
    return this.apiService.get<TClientDTO>(
      `/client?pageSize=${this.pageSize}&pageNumber=${++this.pageNumber}`
    );
  }

  getPreviousPage() {
    return this.apiService.get<TClientDTO>(
      `/client?pageSize=${this.pageSize}&pageNumber=${--this.pageNumber}`
    );
  }

  post(client: TPostClientDTO) {
    return this.apiService.post<TPostClientDTO, null>(`/client`, client);
  }

  put(client: TPutClientDTO) {
    return this.apiService.put<TPutClientDTO, null>(
      `/client/${client.id}`,
      client
    );
  }

  delete(id: number) {
    return this.apiService.delete<null>(`/client/${id}`);
  }
}
