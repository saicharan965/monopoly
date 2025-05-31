import { Injectable, Signal, signal } from "@angular/core";
import { GameState, PropertyCell, PropertyColors, PropertyTier, PropertyType } from "../models/game-board.models";

@Injectable({
  providedIn: "root",
})

export class GameService {
  public gameState = signal<GameState | undefined>(undefined)


  getPlayerNameById(playerId: string): string {
    const gameState = this.gameState();
    if (!gameState || !gameState.players) {
      throw new Error("Game state or players not found");
    }
    const player = gameState.players.find(player => player.id === playerId);
    if (!player) {
      throw new Error(`Player with id ${playerId} not found`);
    }
    return player.name;
  }

  #properties: PropertyCell[] = [
    {
      id: 1, name: "Start",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: PropertyType.Start,
      details: {
        description: "Collect ₹200 every time you pass Start!",
        imageUrl: "properties/start.jpg",
        houseCost: 0,
        hotelCost: 0
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 2, name: "Delhi",
      price: 380, rent: 45,
      tier: PropertyTier.Luxury,
      color: PropertyColors.Red,
      type: PropertyType.Property,
      details: {
        description: "Capital of India — luxury at its finest.",
        imageUrl: "properties/delhi.jpg",
        houseCost: 100,
        hotelCost: 300
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 3, name: "Bangalore",
      price: 360, rent: 40,
      tier: PropertyTier.Luxury,
      color: PropertyColors.Red,
      type: PropertyType.Property,
      details: {
        description: "Tech capital buzzing with innovation.",
        imageUrl: "properties/bangalore.jpg",
        houseCost: 95,
        hotelCost: 290
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 4, name: "Hyderabad",
      price: 340, rent: 38,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "City of pearls and emerging startups.",
        imageUrl: "properties/hyderabad.jpg",
        houseCost: 90,
        hotelCost: 270
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 5, name: "Chennai",
      price: 320, rent: 36,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "The cultural heart of South India.",
        imageUrl: "properties/chennai.jpg",
        houseCost: 85,
        hotelCost: 260
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 6, name: "Kolkata",
      price: 310, rent: 34,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "The City of Joy, full of history.",
        imageUrl: "properties/kolkata.jpg",
        houseCost: 80,
        hotelCost: 250
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 7, name: "Pune",
      price: 300, rent: 32,
      tier: PropertyTier.Premium,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Youthful energy and booming IT hub.",
        imageUrl: "properties/pune.jpg",
        houseCost: 75,
        hotelCost: 240
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 8, name: "Ahmedabad",
      price: 290, rent: 30,
      tier: PropertyTier.Premium,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Vibrant heritage blended with modernity.",
        imageUrl: "properties/ahmedabad.jpg",
        houseCost: 70,
        hotelCost: 230
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 9, name: "Jaipur",
      price: 280, rent: 28,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "The Pink City, royal and radiant.",
        imageUrl: "properties/jaipur.jpg",
        houseCost: 65,
        hotelCost: 220
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 10, name: "Resort",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: PropertyType.Resort,
      details: {
        description: "Relaxation spot! Take a break here.",
        imageUrl: "properties/resort.jpg",
        houseCost: 0,
        hotelCost: 0
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 11, name: "Kanpur",
      price: 260, rent: 26,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "An industrial powerhouse on the rise.",
        imageUrl: "properties/kanpur.jpg",
        houseCost: 60,
        hotelCost: 210
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 12, name: "Nagpur",
      price: 250, rent: 25,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "City of Oranges and vibrant trade.",
        imageUrl: "properties/nagpur.jpg",
        houseCost: 55,
        hotelCost: 200
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 13, name: "Indore",
      price: 240, rent: 24,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Cleanest city, bustling with markets.",
        imageUrl: "properties/indore.jpg",
        houseCost: 50,
        hotelCost: 190
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 14, name: "Bhopal",
      price: 230, rent: 23,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "The city of lakes and greenery.",
        imageUrl: "properties/bhopal.jpg",
        houseCost: 48,
        hotelCost: 185
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 15, name: "Visakhapatnam",
      price: 220, rent: 22,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Coastal beauty with industrial strength.",
        imageUrl: "properties/visakhapatnam.jpg",
        houseCost: 45,
        hotelCost: 180
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 16, name: "Surat",
      price: 210, rent: 21,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Diamond city and textile hub.",
        imageUrl: "properties/surat.jpg",
        houseCost: 43,
        hotelCost: 175
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 17, name: "Vadodara",
      price: 200, rent: 20,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Art, culture, and royal heritage.",
        imageUrl: "properties/vadodara.jpg",
        houseCost: 40,
        hotelCost: 170
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 18, name: "Patna",
      price: 190, rent: 19,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Historical charm meets modern development.",
        imageUrl: "properties/patna.jpg",
        houseCost: 38,
        hotelCost: 160
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 19, name: "Party House",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: PropertyType.PartyHouse,
      details: {
        description: "Enjoy a fun party! Relax your mind.",
        imageUrl: "properties/party-house.jpg",
        houseCost: 0,
        hotelCost: 0
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 20, name: "Chandigarh",
      price: 170, rent: 17,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "India's first planned city, beautifully clean.",
        imageUrl: "properties/chandigarh.jpg",
        houseCost: 35,
        hotelCost: 150
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 21, name: "Guwahati",
      price: 160, rent: 16,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "Gateway to Northeast India’s beauty.",
        imageUrl: "properties/guwahati.jpg",
        houseCost: 33,
        hotelCost: 140
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 22, name: "Raipur",
      price: 150, rent: 15,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Emerging city full of potential.",
        imageUrl: "properties/raipur.jpg",
        houseCost: 30,
        hotelCost: 130
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 23, name: "Kochi",
      price: 140, rent: 14,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Queen of the Arabian Sea.",
        imageUrl: "properties/kochi.jpg",
        houseCost: 28,
        hotelCost: 125
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 24, name: "Thiruvananthapuram",
      price: 100, rent: 10,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Kerala's capital, rich in tradition.",
        imageUrl: "properties/thiruvananthapuram.jpg",
        houseCost: 20,
        hotelCost: 100
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 25, name: "Mysuru",
      price: 120, rent: 12,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Royal heritage and majestic palaces.",
        imageUrl: "properties/mysuru.jpg",
        houseCost: 25,
        hotelCost: 110
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 26, name: "Madurai",
      price: 110, rent: 11,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Temple town with ancient glory.",
        imageUrl: "properties/madurai.jpg",
        houseCost: 23,
        hotelCost: 105
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 27, name: "Coimbatore",
      price: 130, rent: 13,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Industrial city surrounded by nature.",
        imageUrl: "properties/coimbatore.jpg",
        houseCost: 27,
        hotelCost: 115
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 28, name: "Jail",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.Red,
      type: PropertyType.Jail,
      details: {
        description: "Oops! You're in jail. Miss a turn!",
        imageUrl: "properties/jail.jpg",
        houseCost: 0,
        hotelCost: 0
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 29, name: "Amritsar",
      price: 85, rent: 8,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "Spiritual heart with Golden Temple.",
        imageUrl: "properties/amritsar.jpg",
        houseCost: 18,
        hotelCost: 85
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 30, name: "Allahabad",
      price: 80, rent: 8,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: PropertyType.Property,
      details: {
        description: "Historic city at the holy Sangam.",
        imageUrl: "properties/allahabad.jpg",
        houseCost: 17,
        hotelCost: 80
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 31, name: "Agra",
      price: 75, rent: 7,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Home of the majestic Taj Mahal.",
        imageUrl: "properties/agra.jpg",
        houseCost: 15,
        hotelCost: 75
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 32, name: "Varanasi",
      price: 70, rent: 7,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "One of the world's oldest cities.",
        imageUrl: "properties/varanasi.jpg",
        houseCost: 14,
        hotelCost: 70
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 33, name: "Nashik",
      price: 65, rent: 6,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: PropertyType.Property,
      details: {
        description: "Wine capital of India.",
        imageUrl: "properties/nashik.jpg",
        houseCost: 13,
        hotelCost: 65
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 34, name: "Aurangabad",
      price: 60, rent: 6,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Historic caves and rich culture.",
        imageUrl: "properties/aurangabad.jpg",
        houseCost: 12,
        hotelCost: 60
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 35, name: "Udaipur",
      price: 55, rent: 5,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "The City of Lakes and royalty.",
        imageUrl: "properties/udaipur.jpg",
        houseCost: 11,
        hotelCost: 55
      },
      isOwned: false,
      isMortgaged: false
    },
    {
      id: 36, name: "Shillong",
      price: 50, rent: 5,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: PropertyType.Property,
      details: {
        description: "Scenic beauty of the northeast hills.",
        imageUrl: "properties/shillong.jpg",
        houseCost: 10,
        hotelCost: 50
      },
      isOwned: false,
      isMortgaged: false
    },
  ];

  public getProperties(): Signal<PropertyCell[]> {
    return signal(this.#properties);
  }

  getPropertyById(id: number): PropertyCell {
    return this.#properties.find(property => property.id === id) as PropertyCell;
  }

  public buyProperty(propertyId: number, playerId: string): void {
    const state = this.gameState();
    if (!state) return;

    const property = this.getPropertyById(propertyId);
    const playerIndex = state.players.findIndex(p => p.id === playerId);

    if (!property) {
      throw new Error(`Property with id ${propertyId} not found`);
    }

    if (property.isOwned) {
      throw new Error(`Property with id ${propertyId} is already owned`);
    }

    if (playerIndex === -1) {
      throw new Error(`Player with id ${playerId} not found`);
    }

    const player = state.players[playerIndex];

    if (player.money < property.price!) {
      throw new Error(`Player ${player.name} doesn't have enough money`);
    }

    property.isOwned = true;
    property.ownerId = playerId;
    property.ownerName = player.name;

    const updatedPlayer = {
      ...player,
      money: player.money - property.price!,
      properties: [
        ...(player.properties || []),
        {
          property: this.getPropertyById(propertyId),
          houseCount: 0,
          hotelCount: 0,
          rentCollected: 0
        }
      ]
    };

    const updatedPlayers = [...state.players];
    updatedPlayers[playerIndex] = updatedPlayer;

    this.gameState.set({
      ...state,
      players: updatedPlayers
    });
    localStorage.setItem(`game-${state.id}`, JSON.stringify(this.gameState()));
  }


  public mortgageProperty(propertyId: number): void {
    const property = this.getPropertyById(propertyId);
    if (!property || !property.isOwned || property.isMortgaged) return;

    property.isMortgaged = true;

    const gameState = this.gameState();
    const owner = gameState?.players.find(p => p.id === property.ownerId);
    if (owner) {
      owner.money += property.price! / 2;
    }

    this.gameState.update(() => ({ ...gameState! }));
    localStorage.setItem(`game-${gameState?.id}`, JSON.stringify(gameState));
  }
}
