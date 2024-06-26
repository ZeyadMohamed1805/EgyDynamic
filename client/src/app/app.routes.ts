import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CallsComponent } from './pages/calls/calls.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard/clients', component: ClientsComponent },
  { path: 'dashboard/calls/:id', component: CallsComponent },
  { path: '**', component: NotFoundComponent },
];
