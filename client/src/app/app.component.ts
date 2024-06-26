import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent implements OnInit {
  isLayoutVisible: boolean = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLayoutVisible = this.router.url.includes('dashboard');
    });
  }
}
