import { Component, inject, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { Subject } from 'rxjs';
import { PropertyColors, PropertyCell, GameState, Status } from '../models/game-board.models';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PropertyCellComponent } from '../property-cell/property-cell.component';
import { DiceComponent } from '../dice/dice.component';
import { PlayerActionsComponent } from '../player-actions/player-actions.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PropertyCellComponent, DiceComponent, PlayerActionsComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy {
  protected PropertyColors = PropertyColors;
  protected gameState = signal<GameState | undefined>(undefined);
  protected selectedProperty = signal<PropertyCell | undefined>(undefined);
  protected isRolling = false;
  protected diceValues = [1, 1];
  protected showTimer = signal(false);
  protected timer = signal(0);
  #gameService = inject(GameService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  protected properties = signal<PropertyCell[]>([]);
  #unsubscribe$: Subject<void> = new Subject<void>();
  private currentTimerId?: number;
  private currentIntervalId?: number;

  constructor() {
    // Set up effect with allowSignalWrites option
    effect(() => {
      const serviceState = this.#gameService.gameState();
      if (serviceState) {
        this.updateGameStateFromService(serviceState);
      }
    }, { allowSignalWrites: true });
  }

  private updateGameStateFromService(serviceState: GameState) {
    this.gameState.set(serviceState);
    const currentPlayer = serviceState.currentPlayer;
    if (currentPlayer) {
      const currentProperty = this.#gameService.getPropertyById(currentPlayer.position);
      this.selectedProperty.set(currentProperty);
    }
  }

  public ngOnInit() {
    const gameId = this.#route.snapshot.params['id'];
    const localGameKey = `game-${gameId}`;
    const previousGame = localStorage.getItem(localGameKey);

    // First set the properties
    const properties = this.#gameService.getProperties()();

    if (previousGame != null) {
      const parsedGame = JSON.parse(previousGame);

      // Restore property ownership from saved game state
      if (parsedGame.players) {
        parsedGame.players.forEach((player: any) => {
          if (player.properties) {
            player.properties.forEach((prop: any) => {
              const property = properties.find(p => p.id === prop.property.id);
              if (property) {
                property.isOwned = true;
                property.ownerId = player.id;
                property.isMortgaged = prop.isMortgaged || false;
              }
            });
          }
        });
      }

      this.properties.set(properties);

      // Update both component and service state
      this.updateGameStateFromService(parsedGame);
      this.#gameService.gameState.set(parsedGame);
    } else {
      this.properties.set(properties);
    }
  }

  protected getPlayerColor(ownerId: string): string {
    const player = this.gameState()?.players.find(p => p.id === ownerId);
    return player?.tokenColor || '#000'; // fallback color
  }

  protected onDetails(propertyId: number) {
    const prop = this.properties().find(p => p.id === propertyId);
    if (prop) {
      this.selectedProperty.set(prop);
    }
    this.#router.navigate(['property', propertyId], { relativeTo: this.#route });
  }

  private updateGameState(stateUpdater: (prevState: GameState) => GameState) {
    const prevState = this.gameState();
    if (!prevState || !prevState.id) {
      throw new Error('GameState or GameState.id is undefined');
    }

    const newState = stateUpdater(prevState);

    // Update both component and service state
    this.gameState.set(newState);
    this.#gameService.gameState.set(newState);

    // Update localStorage
    localStorage.setItem(`game-${newState.id}`, JSON.stringify(newState));
  }

  protected rollDice() {
    this.isRolling = true;
    this.updateGameState((prevState) => ({
      ...prevState,
      status: Status.RollingDice,
      lastPlayedOn: new Date(),
    }));

    let rollInterval = setInterval(() => {
      this.diceValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      this.diceValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      this.isRolling = false;
      this.showTimer.set(true);

      this.updateGameState((prevState) => ({
        ...prevState,
        lastPlayedOn: new Date(),
        isCurrentPlayerAlreadyRolledTheDice: true,
        currentPlayer: prevState.players.find(player => player.id === prevState.currentPlayer.id) || prevState.currentPlayer,
        status: Status.RolledDice,
        rolledDiceValues: this.diceValues,
        rolledOn: new Date(),
      }));

      this.#startCountDown(25);
      this.#updateStateAndSaveToLocalStorage();
    }, 2000);
  }

  #startCountDown(secs?: number) {
    // Clear any existing timer
    this.#clearCurrentTimer();

    this.timer.set(secs ? secs : 10);

    // Store the interval ID
    this.currentIntervalId = window.setInterval(() => {
      this.timer.update((prev) => {
        // Don't go below 0
        return Math.max(0, prev - 1);
      });
    }, 1000);

    this.currentTimerId = window.setTimeout(() => {
      this.#clearCurrentTimer();
      this.showTimer.set(false);
      this.endTurn();
      this.timer.set(0);
    }, secs ? secs * 1000 : 10000);
  }

  #clearCurrentTimer() {
    if (this.currentTimerId) {
      clearTimeout(this.currentTimerId);
      this.currentTimerId = undefined;
    }
    if (this.currentIntervalId) {
      clearInterval(this.currentIntervalId);
      this.currentIntervalId = undefined;
    }
  }

  protected endTurn() {
    // Clear the timer when manually ending turn
    this.#clearCurrentTimer();
    this.showTimer.set(false);
    this.updateGameState((prevState) => {
      const currentIndex = prevState.players.findIndex(p => p.id === prevState.currentPlayer.id);
      const nextPlayer = prevState.players[(currentIndex + 1) % prevState.players.length];

      return {
        ...prevState,
        status: Status.EndTurn,
        lastPlayedOn: new Date(),
        isCurrentPlayerAlreadyRolledTheDice: false,
        currentPlayer: nextPlayer
      };
    });
  }

  #updateStateAndSaveToLocalStorage() {
    this.updateGameState((prevState) => {
      const updatedPlayers = prevState.players.map(player => {
        if (player.id === prevState.currentPlayer.id) {
          return {
            ...player,
            position: (player.position + this.diceValues[0] + this.diceValues[1]) % this.properties().length
          };
        }
        return player;
      });

      const newGameState: GameState = {
        ...prevState,
        players: updatedPlayers,
        status: Status.RolledDice,
        lastPlayedOn: new Date(),
      };

      const newCurrentPlayer = newGameState.players.find(p => p.id === newGameState.currentPlayer.id);
      const newProperty = this.#gameService.getPropertyById(newCurrentPlayer?.position ?? 0);
      this.selectedProperty.set(newProperty);

      return newGameState;
    });
  }

  public ngOnDestroy() {
    this.#clearCurrentTimer();
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
