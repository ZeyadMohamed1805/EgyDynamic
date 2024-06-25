import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  onLogout(): void {
    this.storageService.removeItem('EGD_TOKEN');
    this.router.navigateByUrl('auth');
  }
}
