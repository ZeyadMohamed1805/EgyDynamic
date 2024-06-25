import { Component } from '@angular/core';
import { MainComponent } from '../../components/clients/main/main.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MainComponent],
  template: '<app-main />',
})
export class ClientsComponent {}
