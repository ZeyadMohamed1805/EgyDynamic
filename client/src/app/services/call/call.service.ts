import { Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TCallDTO, TPostCallDTO, TPutCallDTO } from '../../types/dtos/call';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  names = signal([
    'الرقم',
    'التوصيف',
    'المدة',
    'الوقت',
    'انتهت',
    'النوع',
    'المدخل',
    'التاريخ',
    'المعدل',
    'اليوم',
  ]);
  columns = signal([
    'id',
    'description',
    'duration',
    'madeOn',
    'isCompleted',
    'type',
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

  getAll(clientId: number) {
    this.pageNumber = 1;
    this.pageSize = 3;
    return this.apiService.get<TCallDTO>(
      `/call/${clientId}?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
    );
  }

  getNextPage(clientId: number) {
    return this.apiService.get<TCallDTO>(
      `/call/${clientId}?pageSize=${this.pageSize}&pageNumber=${++this
        .pageNumber}`
    );
  }

  getPreviousPage(clientId: number) {
    return this.apiService.get<TCallDTO>(
      `/call/${clientId}?pageSize=${this.pageSize}&pageNumber=${
        this.pageNumber > 1 ? --this.pageNumber : 1
      }`
    );
  }

  post(client: TPostCallDTO) {
    return this.apiService.post<TPostCallDTO, null>(`/call`, client);
  }

  put(client: TPutCallDTO) {
    return this.apiService.put<TPutCallDTO, null>(`/call/${client.id}`, client);
  }

  delete(id: number) {
    return this.apiService.delete<null>(`/call/${id}`);
  }
}
