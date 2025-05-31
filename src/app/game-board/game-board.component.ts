import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { PropertyColors, PropertyCell, GameState, Status } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { PropertyCellComponent } from '../property-cell/property-cell.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DiceComponent } from '../dice/dice.component';
import { PlayerActionsComponent } from '../player-actions/player-actions.component';

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

  public ngOnInit() {
    const gameId = this.#route.snapshot.params['id'];
    const localGameKey = `game-${gameId}`;
    const previousGame = localStorage.getItem(localGameKey);
    this.properties.set(this.#gameService.getProperties()());
    if (previousGame != null) {
      //restore the previous game and maybe ask a confirmation that you want to continue ?
      this.gameState.set(JSON.parse(previousGame));
      this.#gameService.gameState.update(() => JSON.parse(previousGame));
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


  protected rollDice() {
    this.isRolling = true;
    this.gameState.update((prevState) => {
      if (!prevState || !prevState.id) {
        throw new Error('GameState or GameState.id is undefined');
      }
      return { ...prevState, status: Status.RollingDice, lastPlayedOn: new Date(), id: prevState.id };
    });
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
      this.gameState.update((prevState) => {
        if (!prevState || !prevState.id) {
          throw new Error('GameState or GameState.id is undefined');
        }
        return {
          ...prevState,
          lastPlayedOn: new Date(),
          id: prevState.id,
          isCurrentPlayerAlreadyRolledTheDice: true,
          currentPlayer: prevState.players.find(player => player.id === prevState.currentPlayer.id) || prevState.currentPlayer,
          status: Status.RolledDice,
          rolledDiceValues: this.diceValues,
          rolledOn: new Date(),
        };
      });
      this.#startCountDown(25)
      this.#updateStateAndSaveToLocalStorage();

    }, 2000);
  }



  protected endTurn() {
    this.showTimer.set(false);
    this.gameState.update((prevState) => {
      if (!prevState || !prevState.id) {
        throw new Error('GameState or GameState.id is undefined');
      }

      const currentIndex = prevState.players.findIndex(p => p.id === prevState.currentPlayer.id);
      const nextPlayer = prevState.players[(currentIndex + 1) % prevState.players.length];

      return {
        ...prevState,
        status: Status.EndTurn,
        lastPlayedOn: new Date(),
        id: prevState.id,
        isCurrentPlayerAlreadyRolledTheDice: false,
        currentPlayer: nextPlayer
      };
    });

    localStorage.setItem(`game-${this.gameState()?.id}`, JSON.stringify(this.gameState()));
  }

  #startCountDown(secs?: number) {
    this.timer.set(secs ? secs : 10);
    const interval = setInterval(() => {
      this.timer.update((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      this.showTimer.set(false);
      this.endTurn()
      this.timer.set(0);
    }, secs ? secs * 1000 : 10000);
  }

  #updateStateAndSaveToLocalStorage() {
    this.gameState.update((prevState) => {
      if (!prevState || !prevState.id) {
        throw new Error('GameState or GameState.id is undefined');
      }
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
        id: prevState.id
      };
      const newCurrentPlayer = newGameState.players.find(p => p.id === newGameState.currentPlayer.id);
      const newProperty = this.#gameService.getPropertyById(newCurrentPlayer?.position ?? 0);
      this.selectedProperty.set(newProperty);
      return newGameState;
    });
    localStorage.setItem(`game-${this.gameState()?.id}`, JSON.stringify(this.gameState()));
  }


  public ngOnDestroy() {
    this.#unsubscribe$.next()
    this.#unsubscribe$.complete()
  }
}
