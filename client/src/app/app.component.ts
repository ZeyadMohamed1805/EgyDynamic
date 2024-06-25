import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent implements OnInit {
  isLayoutVisible: boolean = false;
  routesThatActivateLayout: string[] = [
    '/dashboard/clients',
    '/dashboard/calls',
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
      this.isLayoutVisible = this.routesThatActivateLayout.includes(route.url);
    });
  }
}
