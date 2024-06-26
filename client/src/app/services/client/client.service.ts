import { Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TClientDTO, TPostClientDTO } from '../../types/dtos/client';

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

  constructor(private readonly apiService: ApiService) {}

  getAll() {
    return this.apiService.get<TClientDTO[]>(
      `/client?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
    );
  }

  getNextPage() {
    return this.apiService.get<TClientDTO[]>(
      `/client?pageSize=${this.pageSize}&pageNumber=${++this.pageNumber}`
    );
  }

  getPreviousPage() {
    return this.apiService.get<TClientDTO[]>(
      `/client?pageSize=${this.pageSize}&pageNumber=${--this.pageNumber}`
    );
  }

  post(client: TPostClientDTO) {
    return this.apiService.post<TPostClientDTO, null>(`/client`, client);
  }
}
