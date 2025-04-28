import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface PlayerFormGroup {
  id: FormControl<string | null>;
  tokenColor: FormControl<string | null>;
  name: FormControl<string | null>;
}

export interface CreateGameFormGroup {
  id: FormControl<string | null>;
  maxPlayers: FormControl<number | null>;
  players: FormArray<FormGroup<PlayerFormGroup>>;
}
