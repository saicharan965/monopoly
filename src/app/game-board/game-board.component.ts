import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { PropertyColors, PropertyCell } from '../models/game-board.models';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { PropertyCellComponent } from '../property-cell/property-cell.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, PropertyCellComponent, RouterOutlet],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit, OnDestroy {
  protected PropertyColors = PropertyColors;
  #gameService = inject(GameService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  protected properties = signal<PropertyCell[]>([]);
  #unsubscribe$: Subject<void> = new Subject<void>();
  public ngOnInit() {
    this.properties.set(this.#gameService.getProperties()());
  }

  onDetails(propertyId: number) {
    this.#router.navigate(['property', propertyId], { relativeTo: this.#route })
  }

  public ngOnDestroy() {
    this.#unsubscribe$.next()
    this.#unsubscribe$.complete()
  }
}
