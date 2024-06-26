import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private storageService: StorageService,
    private readonly router: Router
  ) {}

  validateToken(): void {
    const token: string = this.storageService.getItem('EGD_TOKEN');
    !token && this.router.navigateByUrl('auth');
  }
}
