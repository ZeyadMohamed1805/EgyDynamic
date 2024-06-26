import { Component } from '@angular/core';
import { MainComponent } from '../../components/calls/main/main.component';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [MainComponent],
  template: '<app-main />',
})
export class CallsComponent {}
