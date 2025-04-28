import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid'
import { AvailableTokenColors } from '../models/game-board.models';
import { ToastrService } from 'ngx-toastr';
import { CreateGameFormGroup, PlayerFormGroup } from '../models/game-form-group';
import { ActivatedRoute, Router } from '@angular/router';


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
  #toastrService = inject(ToastrService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  protected lobbyFormGroup: FormGroup<CreateGameFormGroup> = new FormGroup({
    id: new FormControl<string>(uuidv4()),
    maxPlayers: new FormControl<number>(2),
    players: new FormArray<FormGroup<PlayerFormGroup>>([]),
  });

  ngOnInit(): void {
    this.addPlayer()
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
    if (this.lobbyFormGroup.valid) {
      const gameId = this.lobbyFormGroup.controls['id'].value;
      sessionStorage.setItem(`gameLobby-${gameId}`, JSON.stringify(this.lobbyFormGroup.value));
      this.#router.navigate(['game', gameId], { relativeTo: this.#route });
    } else {
      this.#toastrService.error('Please fill all the required fields.');
    }
  }

  #getSelectedColors(excludeIndex?: number): string[] {
    return this.players.controls
      .filter((_, idx) => idx !== excludeIndex)
      .map(player => player.get('tokenColor')?.value)
      .filter((color): color is string => !!color);
  }
}
