import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, Player, Property } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly INITIAL_MONEY = 15000;
  private gameState = new BehaviorSubject<GameState>({
    id: '',
    players: [],
    properties: this.initializeProperties(),
    currentPlayer: 0,
    started: false,
    maxPlayers: 2
  });

  gameState$ = this.gameState.asObservable();

  private initializeProperties(): Property[] {
    return [
      { id: 0, name: 'Start', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 1, name: 'Mumbai', type: 'property', price: 6000, rent: 600, houses: 0, tier: 1 },
      { id: 2, name: 'Delhi', type: 'property', price: 5500, rent: 550, houses: 0, tier: 1 },
      { id: 3, name: 'Chance', type: 'chance', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 4, name: 'Bangalore', type: 'property', price: 5000, rent: 500, houses: 0, tier: 1 },
      { id: 5, name: 'Chennai', type: 'property', price: 4800, rent: 480, houses: 0, tier: 1 },
      { id: 6, name: 'Community Chest', type: 'community', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 7, name: 'Kolkata', type: 'property', price: 4500, rent: 450, houses: 0, tier: 1 },
      { id: 8, name: 'Income Tax', type: 'tax', price: 2000, rent: 0, houses: 0, tier: 1 },
      { id: 9, name: 'Hyderabad', type: 'property', price: 4000, rent: 400, houses: 0, tier: 1 },
      { id: 10, name: 'Jail', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 }
    ];
  }

  startGame(playerCount: number): void {
    const players: Player[] = Array(playerCount).fill(null).map((_, i) => ({
      id: `player-${i + 1}`,
      name: `Player ${i + 1}`,
      money: this.INITIAL_MONEY,
      position: 0,
      properties: []
    }));

    this.gameState.next({
      ...this.gameState.value,
      id: `game-${Date.now()}`,
      players,
      started: true,
      currentPlayer: 0
    });
  }

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  movePlayer(playerId: string, steps: number): void {
    const state = this.gameState.value;
    const playerIndex = state.players.findIndex(p => p.id === playerId);

    if (playerIndex === -1) return;

    const player = state.players[playerIndex];
    const newPosition = (player.position + steps) % 40;

    const updatedPlayers = state.players.map(p =>
      p.id === playerId ? { ...p, position: newPosition } : p
    );

    const nextPlayer = (playerIndex + 1) % state.players.length;

    this.gameState.next({
      ...state,
      players: updatedPlayers,
      currentPlayer: nextPlayer
    });
  }
}