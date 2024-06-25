import { Component } from '@angular/core';
import { MainComponent } from '../../components/auth/main/main.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MainComponent],
  template: '<app-main />',
})
export class AuthComponent {}
