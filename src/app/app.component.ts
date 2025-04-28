import { Component, inject, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { PropertyCell } from './models/game-board.models';
import { PropertyCellComponent } from './property-cell/property-cell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PropertyCellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'monopoly-offline';
  #gameService = inject(GameService);
  protected properties: PropertyCell[] = [];
  ngOnInit() {
    this.#gameService.getProperties().subscribe(properties => this.properties = properties);
  }
}
