import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { Player, Property } from './models/game.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  gameStarted = false;
  playerCount = 2;
  players: Player[] = [];
  properties: Property[] = [];
  currentPlayer = 0;
  rolling = false;
  lastRoll?: number;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.gameState$.subscribe(state => {
      this.gameStarted = state.gameStarted;
      this.players = state.players;
      this.properties = state.properties;
      this.currentPlayer = state.currentPlayer;
    });
  }

  startGame() {
    this.gameService.startGame(this.playerCount);
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      '#ff0000': 'red',
      '#00ff00': 'green',
      '#0000ff': 'blue',
      '#ffff00': 'yellow'
    };
    return colorMap[color] || 'red';
  }

  getGridPosition(index: number): { col: number; row: number } {
    const size = 11;
    const position = index % 40;

    if (position < 11) {
      return { col: 11 - position, row: 11 };
    } else if (position < 21) {
      return { col: 1, row: 11 - (position - 10) };
    } else if (position < 31) {
      return { col: position - 19, row: 1 };
    } else {
      return { col: 11, row: position - 29 };
    }
  }

  async rollDice() {
    if (this.rolling) return;

    this.rolling = true;
    const roll = this.gameService.rollDice();
    this.lastRoll = roll;

    await new Promise(resolve => setTimeout(resolve, 1000));
    this.gameService.movePlayer(this.currentPlayer, roll);
    this.rolling = false;
  }
}
