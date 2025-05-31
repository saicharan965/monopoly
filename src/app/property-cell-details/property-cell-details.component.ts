import { Component, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { PropertyCell } from '../models/game-board.models';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-property-cell-details',
  standalone: true,
  imports: [],
  templateUrl: './property-cell-details.component.html',
  styleUrl: './property-cell-details.component.scss'
})
export class PropertyCellDetailsComponent implements OnInit {
  public property = signal<PropertyCell | undefined>(undefined);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #gameService = inject(GameService);


  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: KeyboardEvent) {
    event.preventDefault();
    this.navigateBack();
  }

  protected navigateBack() {
    this.#router.navigate(['../../'], { relativeTo: this.#route })
  }

  public ngOnInit(): void {
    this.#route.params.subscribe(params => {
      const propertyId = Number(params['id']);
      this.property.set(this.#gameService.getPropertyById(propertyId));
    })
  }
}
