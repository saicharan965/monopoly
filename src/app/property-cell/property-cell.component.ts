import { Component, input } from '@angular/core';
import { PropertyCell } from '../models/game-board.models';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent {
  public property = input.required<PropertyCell>()
}
