import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TClientDTO } from '../../types/dtos/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  names: string[] = [
    'الرقم',
    'الاسم',
    'التوصيف',
    'الإقامة',
    'المدخل',
    'التاريخ',
    'المعدل',
    'اليوم',
  ];
  columns: string[] = [
    'id',
    'name',
    'description',
    'address',
    'createdBy',
    'createdOn',
    'updatedBy',
    'updatedOn',
  ];
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
}
