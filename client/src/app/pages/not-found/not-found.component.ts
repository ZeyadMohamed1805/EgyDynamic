import { Component } from '@angular/core';
import { MainComponent } from '../../components/not-found/main/main.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MainComponent],
  template: '<app-main />',
})
export class NotFoundComponent {}
