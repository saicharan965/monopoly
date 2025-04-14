import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState, Player, Property } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly INITIAL_MONEY = 15000;
  private gameState = new BehaviorSubject<GameState>({
    players: [],
    properties: this.initializeProperties(),
    currentPlayer: 0,
    gameStarted: false
  });

  gameState$ = this.gameState.asObservable();

  private initializeProperties(): Property[] {
    return [
      { id: 0, name: 'Start', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 1, name: 'Mumbai', type: 'property', price: 6000, rent: 600, houses: 0, tier: 1 },
      { id: 2, name: 'Delhi', type: 'property', price: 5500, rent: 550, houses: 0, tier: 1 },
      { id: 3, name: 'Chance', type: 'chance', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 4, name: 'Bangalore', type: 'property', price: 5000, rent: 500, houses: 0, tier: 1 },
      { id: 5, name: 'Electric Company', type: 'utility', price: 3000, rent: 300, houses: 0, tier: 1 },
      { id: 6, name: 'Community Chest', type: 'community', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 7, name: 'Chennai', type: 'property', price: 4800, rent: 480, houses: 0, tier: 1 },
      { id: 8, name: 'Income Tax', type: 'tax', price: 2000, rent: 0, houses: 0, tier: 1 },
      { id: 9, name: 'Hyderabad', type: 'property', price: 4000, rent: 400, houses: 1, tier: 1 },
      { id: 10, name: 'Jail', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 },

      { id: 11, name: 'Ahmedabad', type: 'property', price: 3800, rent: 380, houses: 0, tier: 2 },
      { id: 12, name: 'Railway Station', type: 'utility', price: 3500, rent: 350, houses: 0, tier: 2 },
      { id: 13, name: 'Lucknow', type: 'property', price: 3700, rent: 370, houses: 0, tier: 2 },
      { id: 14, name: 'Patna', type: 'property', price: 3600, rent: 360, houses: 0, tier: 2 },
      { id: 15, name: 'Goa', type: 'property', price: 4500, rent: 450, houses: 0, tier: 2 },
      { id: 16, name: 'Community Chest', type: 'community', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 17, name: 'Bhopal', type: 'property', price: 3400, rent: 340, houses: 0, tier: 2 },
      { id: 18, name: 'Chance', type: 'chance', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 19, name: 'Nagpur', type: 'property', price: 3200, rent: 320, houses: 0, tier: 2 },
      { id: 20, name: 'Free Parking', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 },

      { id: 21, name: 'Indore', type: 'property', price: 3100, rent: 310, houses: 0, tier: 2 },
      { id: 22, name: 'Kochi', type: 'property', price: 3000, rent: 300, houses: 0, tier: 2 },
      { id: 23, name: 'Chance', type: 'chance', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 24, name: 'Pune', type: 'property', price: 2900, rent: 290, houses: 0, tier: 2 },
      { id: 25, name: 'Railway Station', type: 'utility', price: 3500, rent: 350, houses: 0, tier: 2 },
      { id: 26, name: 'Community Chest', type: 'community', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 27, name: 'Jaipur', type: 'property', price: 2800, rent: 280, houses: 0, tier: 2 },
      { id: 28, name: 'Water Works', type: 'utility', price: 3000, rent: 300, houses: 0, tier: 1 },
      { id: 29, name: 'Surat', type: 'property', price: 2700, rent: 270, houses: 0, tier: 2 },
      { id: 30, name: 'Go to Jail', type: 'corner', price: 0, rent: 0, houses: 0, tier: 1 },

      { id: 31, name: 'Vadodara', type: 'property', price: 2600, rent: 260, houses: 0, tier: 3 },
      { id: 32, name: 'Amritsar', type: 'property', price: 2500, rent: 250, houses: 0, tier: 3 },
      { id: 33, name: 'Community Chest', type: 'community', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 34, name: 'Varanasi', type: 'property', price: 2400, rent: 240, houses: 0, tier: 3 },
      { id: 35, name: 'Railway Station', type: 'utility', price: 3500, rent: 350, houses: 0, tier: 2 },
      { id: 36, name: 'Chance', type: 'chance', price: 0, rent: 0, houses: 0, tier: 1 },
      { id: 37, name: 'Ranchi', type: 'property', price: 2300, rent: 230, houses: 0, tier: 3 },
      { id: 38, name: 'Luxury Tax', type: 'tax', price: 3000, rent: 0, houses: 0, tier: 1 },
      { id: 39, name: 'Shillong', type: 'property', price: 2200, rent: 220, houses: 0, tier: 3 },
    ];
  }


  startGame(playerCount: number): void {
    const players: Player[] = Array(playerCount).fill(null).map((_, i) => ({
      id: i,
      name: `Player ${i + 1}`,
      color: this.getPlayerColor(i),
      money: this.INITIAL_MONEY,
      position: 0,
      properties: []
    }));

    this.gameState.next({
      ...this.gameState.value,
      players,
      gameStarted: true,
      currentPlayer: 0
    });
  }

  private getPlayerColor(index: number): string {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
    return colors[index];
  }

  rollDice(): number {
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll;
  }

  movePlayer(playerId: number, steps: number): void {
    const state = this.gameState.value;
    const player = state.players[playerId];
    const newPosition = (player.position + steps) % 40;

    const updatedPlayers = state.players.map(p =>
      p.id === playerId ? { ...p, position: newPosition } : p
    );

    const nextPlayer = (playerId + 1) % state.players.length;

    this.gameState.next({
      ...state,
      players: updatedPlayers,
      currentPlayer: nextPlayer
    });
  }
}