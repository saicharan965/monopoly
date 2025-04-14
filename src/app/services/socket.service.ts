import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private gameState = new BehaviorSubject<GameState | null>(null);
  private gameError = new BehaviorSubject<string | null>(null);
  private diceRoll = new BehaviorSubject<{ playerId: string; roll: number } | null>(null);

  gameState$ = this.gameState.asObservable();
  gameError$ = this.gameError.asObservable();
  diceRoll$ = this.diceRoll.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000');
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('gameStateUpdate', (state: GameState) => {
      this.gameState.next(state);
    });

    this.socket.on('gameCreated', ({ gameId, gameState }: { gameId: string; gameState: GameState }) => {
      this.gameState.next(gameState);
    });

    this.socket.on('joinError', (error: string) => {
      this.gameError.next(error);
      setTimeout(() => this.gameError.next(null), 3000);
    });

    this.socket.on('diceRolled', (data: { playerId: string; roll: number }) => {
      this.diceRoll.next(data);
    });
  }

  createGame(playerName: string, maxPlayers: number) {
    this.socket.emit('createGame', { playerName, maxPlayers });
  }

  joinGame(gameId: string, playerName: string) {
    this.socket.emit('joinGame', { gameId, playerName });
  }

  startGame(gameId: string) {
    this.socket.emit('startGame', gameId);
  }

  rollDice(gameId: string) {
    this.socket.emit('rollDice', gameId);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}