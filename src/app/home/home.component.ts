import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PropertyCell, PropertyColors } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
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
