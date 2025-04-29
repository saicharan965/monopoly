import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { PropertyColors, PropertyCell, GameState, Status } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { PropertyCellComponent } from '../property-cell/property-cell.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DiceComponent } from '../dice/dice.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PropertyCellComponent, DiceComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy {
  protected PropertyColors = PropertyColors;
  protected gameState = signal<GameState | undefined>(undefined);
  protected isRolling = false;
  protected diceValues = [1, 1];
  #gameService = inject(GameService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  protected properties = signal<PropertyCell[]>([]);
  #unsubscribe$: Subject<void> = new Subject<void>();
  public ngOnInit() {
    const gameIdFromRoute = this.#route.snapshot.params['id'];
    const previousGame = localStorage.getItem(`game-${gameIdFromRoute}`)
    this.properties.set(this.#gameService.getProperties()());
    if (previousGame != null) {
      //restore the previous game and maybe ask a confirmation that you want to continue ?
      this.gameState.set(JSON.parse(previousGame));
      this.#gameService.gameState.update(() => JSON.parse(previousGame));
    }
  }

  protected onDetails(propertyId: number) {
    this.#router.navigate(['property', propertyId], { relativeTo: this.#route })
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
      this.gameState.update((prevState) => {
        if (!prevState || !prevState.id) {
          throw new Error('GameState or GameState.id is undefined');
        }
        prevState.players.forEach((player) => {
          if (player.id === prevState.currentPlayer.id) {
            player.position = (player.position + this.diceValues[0] + this.diceValues[1]) % this.properties().length;
          }
        })
        return { ...prevState, status: Status.RolledDice, lastPlayedOn: new Date(), id: prevState.id };
      });
      localStorage.setItem(`game-${this.gameState()?.id}`, JSON.stringify(this.gameState()));
    }, 2000);
  }

  public ngOnDestroy() {
    this.#unsubscribe$.next()
    this.#unsubscribe$.complete()
  }
}
