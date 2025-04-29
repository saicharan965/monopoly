import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DiceComponent implements OnChanges {
  @Input() diceValues: number[] = [1, 1];
  @Input() isRolling: boolean = false;

  dice1Classes: string[] = [];
  dice2Classes: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['diceValues']) {
      this.updateDiceClasses();
    }
  }

  updateDiceClasses(): void {
    if (this.diceValues != null) {
      // First dice
      this.dice1Classes = ['dice', `dice-${this.diceValues[0] || 1}`];
      if (this.isRolling) {
        this.dice1Classes.push('rolling');
      }
      // Second dice
      this.dice2Classes = ['dice', `dice-${this.diceValues[1] || 1}`];
      if (this.isRolling) {
        this.dice2Classes.push('rolling');
      }
    }
  }
}
