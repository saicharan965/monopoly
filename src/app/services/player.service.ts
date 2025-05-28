import { Injectable, signal } from "@angular/core";
import { GameState } from "../models/game-board.models";

@Injectable({
  providedIn: "root",
})

export class PlayerService {
  public gameState = signal<GameState | undefined>(undefined);
  getPlayerNameById(playerId: string): string {
    const gameState = this.gameState();
    if (!gameState || !gameState.players) {
      throw new Error("Game state or players not found");
    }
    const player = gameState.players.find(player => player.id === playerId);
    if (!player) {
      throw new Error(`Player with id ${playerId} not found`);
    }
    return player.name;
  }
}
