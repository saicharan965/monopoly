import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./lobby/lobby.component').then(m => m.LobbyComponent)
      },
      {
        path: ':gameId',
        loadComponent: () => import('./game/game.component').then(m => m.GameComponent)
      }
    ]
  },
];
