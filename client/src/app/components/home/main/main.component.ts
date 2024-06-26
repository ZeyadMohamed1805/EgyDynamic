import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  dots: WritableSignal<number> = signal(1);
  progress: WritableSignal<number> = signal(0);

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.updateProgress();
    this.validateToken();
  }

  updateProgress(): void {
    setInterval(() => {
      this.progress.update((value: number) =>
        value < 100 ? value + 1 : value
      );
    });
  }

  validateToken(): void {
    setTimeout(() => {
      const token: string = this.storageService.getItem('EGD_TOKEN');
      token
        ? this.router.navigateByUrl('dashboard/clients')
        : this.router.navigateByUrl('auth');
    }, 3000);
  }
}
