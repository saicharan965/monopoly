import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DiceComponent {
  diceValues = input<number[] | undefined>(undefined);
  isRolling = input<boolean>(false);

  dice1Classes = computed(() => {
    const values = this.diceValues() ?? [1, 1];
    const rolling = this.isRolling();
    return ['dice', `dice-${values[0]}`, ...(rolling ? ['rolling'] : [])];
  });

  dice2Classes = computed(() => {
    const values = this.diceValues() ?? [1, 1];
    const rolling = this.isRolling();
    return ['dice', `dice-${values[1]}`, ...(rolling ? ['rolling'] : [])];
  });
}
