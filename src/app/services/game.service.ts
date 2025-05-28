import { Injectable, signal } from "@angular/core";
import { GameState } from "../models/game-board.models";

@Injectable({
  providedIn: "root",
})

export class GameService {
  public gameState = signal<GameState | undefined>(undefined)
}
