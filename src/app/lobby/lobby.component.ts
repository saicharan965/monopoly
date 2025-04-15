import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent implements OnInit, OnDestroy {
  playerName = '';
  gameId = '';
  showJoinGame = false;
  showCreateGame = false;
  maxPlayers = 4;
  error: string | null = null;
  private subscriptions: Subscription[] = [];
  #authService = inject(AuthService);
  #socketService = inject(SocketService);
  #router = inject(Router);

  public ngOnInit() {
    this.subscriptions.push(
      this.#authService.user$.subscribe(user => {
        if (user) {
          this.playerName = user.name || '';
        }
      }),
      this.#socketService.gameCreated$.subscribe((gameCreatedResponse) => {
        this.gameId = gameCreatedResponse.gameId;
        this.showCreateGame = false;
        this.#router.navigate([`${this.gameId}`]);
      }),
      this.#socketService.gameError$.subscribe(error => {
        this.error = error;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  createGame() {
    if (this.playerName) {
      this.#socketService.createGame(this.playerName, Number(this.maxPlayers));
    }
  }

  joinGame() {
    if (this.playerName && this.gameId) {
      this.#socketService.joinGame(this.gameId, this.playerName);
    }
  }
}
