import { Component, Input } from '@angular/core';
import { GameState } from '../models/game.model';
import { PropertyCellComponent } from '../property-cell/property-cell.component';
import { CenterAreaComponent } from '../center-area/center-area.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PropertyCellComponent, CenterAreaComponent, CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  @Input() gameState!: GameState;
  @Input() playerName!: string;
  @Input() lastDiceRoll: { playerId: string; roll: number } | null = null;
  @Input() isHost!: () => boolean;
  @Input() startGame!: () => void;
  @Input() getPlayerColor!: (playerId: string) => string;

  getGridPosition(index: number): { col: number; row: number } {
    if (index < 11) return { col: 11 - index, row: 11 };
    if (index < 21) return { col: 1, row: 11 - (index - 10) };
    if (index < 31) return { col: index - 19, row: 1 };
    return { col: 11, row: index - 29 };
  }
}
