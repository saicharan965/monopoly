import { Component, effect, inject, input, signal } from '@angular/core';
import { GameState, PropertyCell } from '../models/game-board.models';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player-actions',
  standalone: true,
  imports: [],
  templateUrl: './player-actions.component.html',
  styleUrl: './player-actions.component.scss'
})
export class PlayerActionsComponent {
  public gameState = input.required<GameState | undefined>();
  public currentProperty = input.required<PropertyCell | undefined>();
  #gameService = inject(GameService);

  protected canBuy(): boolean {
    const prop = this.currentProperty();
    const player = this.gameState()?.currentPlayer;
    return !!(prop && !prop.isOwned && player && prop.price != null && player.money >= prop.price);
  }

  protected canMortgage(): boolean {
    const prop = this.currentProperty();
    const player = this.gameState()?.currentPlayer;
    return !!(prop && prop.ownerId === player?.id && prop.isMortgaged === false);
  }

  protected buyProperty(): void {
    const prop = this.currentProperty();
    const playerId = this.gameState()?.currentPlayer?.id;
    if (prop && playerId) {
      this.#gameService.buyProperty(prop.id, playerId);
    }
    else {
      console.error('Cannot buy property: Invalid property or player ID');
    }
  }

  protected mortgageProperty(): void {
    const prop = this.currentProperty();
    if (prop) {
      this.#gameService.mortgageProperty(prop.id);
    }
  }
}
