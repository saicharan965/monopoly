import { Component, inject, input } from '@angular/core';
import { GameState, Player, PropertyCell } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-actions.component.html',
  styleUrl: './player-actions.component.scss'
})
export class PlayerActionsComponent {
  public gameState = input.required<GameState | undefined>();
  public currentProperty = input.required<PropertyCell | undefined>();
  #gameService = inject(GameService);

  protected get currentPlayer(): Player | undefined {
    return this.gameState()?.currentPlayer;
  }

  protected get currentPlayerProperties(): Player['properties'] {
    const playerId = this.currentPlayer?.id;
    const player = this.gameState()?.players.find(p => p.id === playerId);
    return player?.properties || [];
  }

  protected canBuy(): boolean {
    const prop = this.currentProperty();
    const player = this.currentPlayer;
    return !!(prop && !prop.isOwned && player && prop.price != null && player.money >= prop.price);
  }

  protected canMortgage(): boolean {
    const prop = this.currentProperty();
    const player = this.currentPlayer;
    return !!(prop && prop.ownerId === player?.id && prop.isMortgaged === false);
  }

  protected buyProperty(): void {
    const prop = this.currentProperty();
    const playerId = this.currentPlayer?.id;
    if (prop && playerId) {
      this.#gameService.buyProperty(prop.id, playerId);
    }
  }

  protected mortgageProperty(): void {
    const prop = this.currentProperty();
    if (prop) {
      this.#gameService.mortgageProperty(prop.id);
    }
  }
}
