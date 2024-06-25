import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { TLoginSchema } from '../../types/schema/login';
import { TLoginDTO } from '../../types/dto/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly api: ApiService) {}

  login(user: TLoginSchema) {
    return this.api.post<TLoginSchema, TLoginDTO>('/api/v1/auth/login', user);
  }
}
