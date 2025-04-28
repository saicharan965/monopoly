import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./game-lobby/game-lobby.component').then(m => m.GameLobbyComponent),
      },
      {
        path: 'game/:id',
        loadComponent: () => import('./game-board/game-board.component').then(m => m.GameBoardComponent),
      }
    ]
  }
];
