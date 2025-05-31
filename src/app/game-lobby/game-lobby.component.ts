import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid'
import { AvailableTokenColors, GameState, Player, Status } from '../models/game-board.models';
import { ToastrService } from 'ngx-toastr';
import { CreateGameFormGroup, PlayerFormGroup } from '../models/game-form-group';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss'
})
export class GameLobbyComponent implements OnInit {
  AvailableTokenColors = AvailableTokenColors;
  availableTokenColors = Object.values(AvailableTokenColors);
  hasPreviousGames = false;
  previousGames: GameState[] = []
  #gameService = inject(GameService);
  #toastrService = inject(ToastrService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  protected lobbyFormGroup: FormGroup<CreateGameFormGroup> = new FormGroup({
    id: new FormControl<string>(uuidv4()),
    maxPlayers: new FormControl<number>(2),
    players: new FormArray<FormGroup<PlayerFormGroup>>([]),
  });

  ngOnInit(): void {
    this.addPlayer();
    this.getPreviousGames();

    this.lobbyFormGroup.controls['maxPlayers'].valueChanges.subscribe((newMax: number | null) => {
      if (newMax !== null) {
        while (this.players.length > newMax) {
          this.players.removeAt(this.players.length - 1);
        }
      }
    });
  }


  getPreviousGames() {
    const gamesKeys = Object.keys(localStorage);
    const previousGamesKeys = gamesKeys.filter(x => x.includes('game-'));
    const parsedGames: GameState[] = [];

    previousGamesKeys.forEach((gameKey) => {
      const gameState = localStorage.getItem(gameKey);
      if (gameState != null) {
        const parsedGameState = JSON.parse(gameState) as GameState;
        parsedGames.push(parsedGameState);
      }
    });
    this.previousGames = parsedGames;
    this.hasPreviousGames = parsedGames.length > 0;
  }

  get players() {
    return this.lobbyFormGroup.get('players') as FormArray<FormGroup<PlayerFormGroup>>;
  }

  addPlayer() {
    const availableColors = this.getAvailableColors(-1);
    const defaultColor = availableColors.length > 0 ? availableColors[0] : '';
    const playerForm = new FormGroup<PlayerFormGroup>({
      id: new FormControl<string>(uuidv4()),
      name: new FormControl<string>('', Validators.required),
      tokenColor: new FormControl<string>(defaultColor, Validators.required)
    });
    this.players.push(playerForm);
  }

  protected removePlayer(index: number) {
    this.players.removeAt(index);
  }

  protected getAvailableColors(currentPlayerIndex: number): string[] {
    const selectedColors = this.#getSelectedColors(currentPlayerIndex);
    return this.availableTokenColors.filter(color => !selectedColors.includes(color));
  }

  protected createLobby() {
    if (this.lobbyFormGroup.valid && this.lobbyFormGroup.value.players) {
      const gameId = this.lobbyFormGroup.controls['id'].value;
      const gameState: GameState = {
        id: gameId ? gameId : uuidv4(),
        currentPlayer: this.lobbyFormGroup.value.players[0] as Player,
        status: Status.Waiting,
        lastPlayedOn: new Date(),
        isCurrentPlayerAlreadyRolledTheDice: false,
        players: this.lobbyFormGroup.value.players?.map(player => ({
          id: player.id,
          name: player.name,
          tokenColor: player.tokenColor,
          position: 1,
          properties: [],
          money: 1500,
        })) as Player[]
      }
      localStorage.setItem(`game-${gameId}`, JSON.stringify(gameState));
      this.#gameService.gameState.set(gameState);
      this.#router.navigate(['game', gameId], { relativeTo: this.#route });
    } else {
      this.#toastrService.error('Please fill all the required fields.');
    }
  }

  protected joinGame(gameId: string) {
    this.#router.navigate(['game', gameId], { relativeTo: this.#route });
  }

  protected deleteGame(gameId: string) {
    if (confirm('Are you sure you want to delete this game?')) {
      localStorage.removeItem(`game-${gameId}`);
      this.previousGames = this.previousGames.filter(game => game.id !== gameId);
      this.#toastrService.success('Game deleted successfully');
    }
  }


  #getSelectedColors(excludeIndex?: number): string[] {
    return this.players.controls
      .filter((_, idx) => idx !== excludeIndex)
      .map(player => player.get('tokenColor')?.value)
      .filter((color): color is string => !!color);
  }
}
