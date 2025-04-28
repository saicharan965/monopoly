import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PropertyColors, PropertyCell } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { PropertyCellComponent } from '../property-cell/property-cell.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, PropertyCellComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy {
  protected PropertyColors = PropertyColors;
  #gameService = inject(GameService);
  protected properties: PropertyCell[] = [];
  #unsubscribe$: Subject<void> = new Subject<void>();
  public ngOnInit() {
    this.#gameService.getProperties().pipe(takeUntil(this.#unsubscribe$)).subscribe(properties => this.properties = properties);
  }

  public ngOnDestroy() {
    this.#unsubscribe$.next()
    this.#unsubscribe$.complete()
  }
}
