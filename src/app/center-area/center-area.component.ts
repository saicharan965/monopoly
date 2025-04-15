import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GameState } from '../models/game.model';

@Component({
  selector: 'app-center-area',
  standalone: true,
  imports: [NgIf],
  templateUrl: './center-area.component.html',
  styleUrl: './center-area.component.scss'
})
export class CenterAreaComponent {
  @Input() gameState!: GameState;
  @Input() playerName!: string;
  @Input() lastDiceRoll: { playerId: string; roll: number } | null = null;
  @Input() isHost!: () => boolean;
  @Input() startGame!: () => void;
}
