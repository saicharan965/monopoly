import { Component, Input } from '@angular/core';
import { Property, Player } from '../models/game.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent {
  @Input() property!: Property;
  @Input() index!: number;
  @Input() players: Player[] = [];
  @Input() getPlayerColor!: (playerId: string) => string;
  @Input() getGridPosition!: (index: number) => { col: number; row: number };
}
