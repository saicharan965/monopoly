export interface PropertyCell {
  id: number;
  type: PropertyType;
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

export enum PropertyType {
  Property = 'Property',
  Chance = 'Chance',
  CommunityChest = 'CommunityChest',
  Jail = 'Jail',
  Resort = 'Resort',
  PartyHouse = 'PartyHouse',
  Tax = 'Tax',
  Start = 'Start',
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
  properties: PlayerProperty[] | null;
}
export interface PlayerProperty {
  property: PropertyCell;
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
  currentPlayer: Player;
  isCurrentPlayerAlreadyRolledTheDice: boolean;
  lastPlayedOn: Date
}

export enum Status {
  Started = 'Started',
  Completed = 'Completed',
  Paused = 'Paused',
  Waiting = 'Waiting',
  RollingDice = 'RollingDice',
  RolledDice = 'RolledDice',
  EndTurn = 'EndTurn'
}
