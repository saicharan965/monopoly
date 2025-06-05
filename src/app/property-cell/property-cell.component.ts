import { Component, input } from '@angular/core';
import { GameState, Player, PropertyCell, PropertyType } from '../models/game-board.models';
import { NgClass, NgStyle } from '@angular/common';
import { TokenModelPipe } from '../pipes/token-model.pipe';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [NgClass, NgStyle, TokenModelPipe],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent {
  public property = input.required<PropertyCell>();
  public gameState = input.required<GameState | undefined>();

  get playersOnThisCell(): Player[] {
    if (!this.gameState()) return [];
    return this.gameState()?.players.filter(player => player.position === this.property().id) as Player[];
  }

  get owner(): Player | undefined {
    if (!this.property().isOwned || !this.property().ownerId || !this.gameState()) return undefined;
    return this.gameState()?.players.find(p => p.id === this.property().ownerId);
  }

  get ownershipStyle(): { [key: string]: string } {
    const owner = this.owner;
    if (!owner) return {};

    return {
      'border': `3px solid ${owner.tokenColor}`,
      'box-shadow': `0 0 10px ${owner.tokenColor}`,
      'animation': 'propertyGlow 2s infinite',
      '--owner-color': owner.tokenColor
    };
  }

  getHouses(): number[] {
    const owner = this.owner;
    if (!owner || this.property().type !== PropertyType.Property) return [];

    const properties = owner.properties || [];
    const propertyDetails = properties.find(p => p.property.id === this.property().id);
    if (!propertyDetails) return [];

    const totalHouses = propertyDetails.houseCount + (propertyDetails.hotelCount * 4);
    return Array(Math.min(totalHouses, 4)).fill(0);
  }
}
