import { Component } from '@angular/core';
import { MainComponent } from '../../components/home/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent],
  template: '<app-main />',
})
export class HomeComponent {}
