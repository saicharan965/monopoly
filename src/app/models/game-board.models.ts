export interface PropertyCell {
  id: number;
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
  Utility = 'Utility'
}

export enum PropertyColors {
  LightBlue = 'LightBlue',
  Orange = 'Orange',
  Red = 'Red',
  Yellow = 'Yellow'
}