import { Component, input, OnInit } from '@angular/core';
import { PropertyCell } from '../models/game-board.models';

@Component({
  selector: 'app-property-cell',
  standalone: true,
  imports: [],
  templateUrl: './property-cell.component.html',
  styleUrl: './property-cell.component.scss'
})
export class PropertyCellComponent implements OnInit {
  public propertyCell = input.required<PropertyCell>();

  public ngOnInit(): void {
    this.propertyCell
  }
}
