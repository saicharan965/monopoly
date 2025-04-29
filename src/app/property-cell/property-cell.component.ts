import { Component, input, output } from '@angular/core';
import { GameState, Player, PropertyCell } from '../models/game-board.models';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [NgClass,NgStyle],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent {
  public property = input.required<PropertyCell>()
  public gameState = input.required<GameState | undefined>()

  get playersOnThisCell(): Player[] {
    if (!this.gameState()) return [];
    return this.gameState()?.players.filter(player => player.position === this.property().id) as Player[];
  }
}
