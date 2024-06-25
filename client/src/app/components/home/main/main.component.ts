import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  dots: WritableSignal<number> = signal(1);

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const token: string = this.storageService.getItem('EGD_TOKEN');
      token
        ? this.router.navigateByUrl('dashboard')
        : this.router.navigateByUrl('auth');
    }, 3000);
    this.animateDots();
  }

  animateDots(): void {
    setInterval(() => this.updateDots(), 200);
  }

  updateDots(): void {
    this.dots.update((value: number) => (value === 3 ? 1 : value + 1));
  }
}
