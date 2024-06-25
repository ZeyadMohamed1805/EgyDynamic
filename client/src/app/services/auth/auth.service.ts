import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TLoginSchema } from '../../types/schemas/login';
import { TLoginDTO } from '../../types/dtos/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly api: ApiService) {}

  login(user: TLoginSchema) {
    return this.api.post<TLoginSchema, TLoginDTO>('/auth/login', user);
  }
}
