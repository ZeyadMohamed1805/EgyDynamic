import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  dots: WritableSignal<number> = signal(1);

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl('auth'), 3000);
    this.animateDots();
  }

  animateDots(): void {
    setInterval(() => this.updateDots(), 200);
  }

  updateDots(): void {
    this.dots.update((value: number) => (value === 3 ? 1 : value + 1));
  }
}
