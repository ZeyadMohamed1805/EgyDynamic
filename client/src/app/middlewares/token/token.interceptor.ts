import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const storageService = inject(StorageService);
  const token = storageService.getItem('EGD_TOKEN');
  const headers = request.headers.set('Authorization', `Bearer ${token}`);
  const requestWithToken = request.clone({ headers });

  return next(requestWithToken);
};
