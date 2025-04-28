import { Component, input, output } from '@angular/core';
import { PropertyCell } from '../models/game-board.models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [NgClass],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent {
  public property = input.required<PropertyCell>()
  public details = output<number>()

}
