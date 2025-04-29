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
  details: PropertyDetails
}

export interface PropertyDetails {
  description: string;
  imageUrl: string;
  houseCost: number;
  hotelCost: number;
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
  id: string | null;
  name: string;
  tokenColor: AvailableTokenColors;
  money: number;
  position: number;
  properties: PlayerProperty[];
}
export interface PlayerProperty {
  houseCount: number;
  hotelCount: number;
  rentCollected: number;
}

export enum AvailableTokenColors {
  Red = 'Red',
  Green = 'Green',
  Yellow = 'Yellow',
  Blue = 'Blue',
}

export interface GameState {
  id: string;
  status: Status;
  players: Player[];
  lastPlayedOn: Date
}

export enum Status {
  Started = 'Started',
  Completed = 'Completed',
  Paused = 'Paused',
  Waiting = 'Waiting',
  RollingDice = 'RollingDice'
}
