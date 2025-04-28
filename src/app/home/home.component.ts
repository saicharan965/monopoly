import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PropertyCell, PropertyColors } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  #gameService = inject(GameService);
  #unsubscribe$: Subject<void> = new Subject<void>();
  public ngOnInit() {

  }
  public ngOnDestroy() {
    this.#unsubscribe$.next()
    this.#unsubscribe$.complete()
  }
}
