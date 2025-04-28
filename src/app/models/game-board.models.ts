export interface PropertyCell {
  id: number;
  type: "Property" | "Utility";
  name: string;
  price: number | null;
  rent: number | null;
  ownerId?: number;
  ownerName?: string
  mortgageValue?: number;
  tier: PropertyTier,
  color: PropertyColors;
}

export enum PropertyTier {
  Basic = 'Basic',
  Premium = 'Premium',
  Luxury = 'Luxury',
  Utility = "Utility",
}

export enum PropertyColors {
  LightBlue = 'LightBlue',
  Green = 'Green',
  Red = 'Red',
  Yellow = 'Yellow'
}

export interface Player {
  id: number;
  tokenColor: AvailableTokenColors;
}

export enum AvailableTokenColors {
  Red = 'Red',
  Green = 'Green',
  Yellow = 'Yellow',
  Blue = 'Blue',
}

export interface GameState {
  id: number;
  state: State;
  players: Player[];
}

export enum State {
  Started = 'Started',
  Completed = 'Completed',
  Paused = 'Paused',
  Waiting = 'Waiting',
  RollingDice = 'RollingDice'
}