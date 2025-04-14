import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { GameState, Player, Property } from './models/game.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  gameState: GameState | null = null;
  playerName = '';
  gameId = '';
  showJoinGame = false;
  showCreateGame = false;
  maxPlayers = 4;
  error: string | null = null;
  lastDiceRoll: { playerId: string; roll: number } | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.socketService.gameState$.subscribe(state => {
        this.gameState = state;
      }),
      this.socketService.gameError$.subscribe(error => {
        this.error = error;
      }),
      this.socketService.diceRoll$.subscribe(roll => {
        this.lastDiceRoll = roll;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.socketService.disconnect();
  }

  createGame() {
    if (this.playerName) {
      this.socketService.createGame(this.playerName, Number(this.maxPlayers));
    }
  }

  joinGame() {
    if (this.playerName && this.gameId) {
      this.socketService.joinGame(this.gameId, this.playerName);
    }
  }

  startGame() {
    if (this.gameState) {
      this.socketService.startGame(this.gameState.id);
    }
  }

  rollDice() {
    if (this.gameState && this.isCurrentPlayer()) {
      this.socketService.rollDice(this.gameState.id);
    }
  }

  isCurrentPlayer(): boolean {
    if (!this.gameState) return false;
    const currentPlayer = this.gameState.players[this.gameState.currentPlayer];
    return currentPlayer.name === this.playerName;
  }

  isHost(): boolean {
    if (!this.gameState || !this.gameState.players.length) return false;
    return this.gameState.players[0].name === this.playerName;
  }

  getPlayerColor(playerId: string): string {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    const playerIndex = this.gameState?.players.findIndex(p => p.id === playerId) || 0;
    return colors[playerIndex];
  }

  getGridPosition(index: number): { col: number; row: number } {
    if (index < 11) {
      return { col: 11 - index, row: 11 };
    } else if (index < 21) {
      return { col: 1, row: 11 - (index - 10) };
    } else if (index < 31) {
      return { col: index - 19, row: 1 };
    } else {
      return { col: 11, row: index - 29 };
    }
  }
}
