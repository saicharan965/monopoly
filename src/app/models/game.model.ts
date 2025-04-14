export interface Player {
  id: number;
  name: string;
  color: string;
  money: number;
  position: number;
  properties: number[];
}

export interface Property {
  id: number;
  name: string;
  price: number;
  rent: number;
  owner?: number;
  houses: number;
  type: 'property' | 'chance' | 'community' | 'tax' | 'corner' | 'utility';
  tier: 1 | 2 | 3;
}

export interface GameState {
  players: Player[];
  properties: Property[];
  currentPlayer: number;
  gameStarted: boolean;
  winner?: Player;
}