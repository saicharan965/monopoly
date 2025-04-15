import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameCreatedResponse, GameState } from '../models/game.model';



@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private gameState = new BehaviorSubject<GameState | null>(null);
  private gameCreated = new Subject<GameCreatedResponse>();
  private gameError = new BehaviorSubject<string | null>(null);
  private diceRoll = new BehaviorSubject<{ playerId: string; roll: number } | null>(null);

  gameState$ = this.gameState.asObservable();
  gameCreated$ = this.gameCreated.asObservable();
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
      this.gameCreated.next({ gameId, gameState });
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

  reconnectToGameByName(gameId: string, playerName: string) {
    this.socket.emit('reconnect-by-name', { gameId, playerName });

    this.socket.on('reconnect-success', ({ gameState }) => {
      this.gameState.next(gameState);
    });

    this.socket.on('reconnect-error', (err) => {
      console.error('Reconnect error:', err.message);
      // Optional: show UI error or redirect
    });
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
