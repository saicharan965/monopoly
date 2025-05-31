import { Component, input } from '@angular/core';
import { GameState } from '../models/game-board.models';

@Component({
  selector: 'app-player-actions',
  standalone: true,
  imports: [],
  templateUrl: './player-actions.component.html',
  styleUrl: './player-actions.component.scss'
})
export class PlayerActionsComponent {
  public gameState = input.required<GameState | undefined>();
}
