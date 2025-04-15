import { NgIf, NgFor } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameState } from '../models/game.model';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { GameBoardComponent } from '../game-board/game-board.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf, NgFor, GameBoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  gameState: GameState | null = null;
  playerName = '';
  gameId = '';
  lastDiceRoll: { playerId: string; roll: number } | null = null;
  private subscriptions: Subscription[] = [];
  #activatedRoute = inject(ActivatedRoute);

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.#activatedRoute.queryParams.subscribe(params => {
        this.playerName = params['playerName'] || '';
        this.gameId = params['gameId'] || '';

        if (this.gameId && this.playerName) {
          this.socketService.reconnectToGameByName(this.gameId, this.playerName);
        }
      }),
      this.socketService.gameState$.subscribe(state => {
        this.gameState = state;
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
    const playerIndex = this.gameState?.players.findIndex(p => p.id === playerId) ?? 0;
    return colors[playerIndex % colors.length];
  }

  getGridPosition(index: number): { col: number; row: number } {
    if (index < 11) return { col: 11 - index, row: 11 };
    if (index < 21) return { col: 1, row: 11 - (index - 10) };
    if (index < 31) return { col: index - 19, row: 1 };
    return { col: 11, row: index - 29 };
  }
}
