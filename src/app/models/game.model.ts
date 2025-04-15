export interface Player {
  id: string;
  name: string;
  money: number;
  position: number;
  properties: Property[];
}

export interface Property {
  id: number;
  name: string;
  type: 'property' | 'chance' | 'community' | 'tax' | 'corner' | 'utility';
  price: number;
  rent: number;
  owner?: string;
  houses: number;
  tier: 1 | 2 | 3;
}

export interface GameState {
  id: string;
  players: Player[];
  properties: Property[];
  currentPlayer: number;
  started: boolean;
  maxPlayers: number;
}

export interface GameCreatedResponse {
  gameState: GameState,
  gameId: string
}