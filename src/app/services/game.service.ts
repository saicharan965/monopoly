import { Injectable, signal, Signal } from "@angular/core";
import { GameState, PropertyCell, PropertyColors, PropertyTier } from "../models/game-board.models";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class GameService {
  public gameState = signal<GameState | undefined>(undefined)

  #properties: PropertyCell[] = [
    {
      id: 1, name: "Start",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: "Utility",
      details: {
        description: "Collect ₹200 every time you pass Start!",
        imageUrl: "properties/start.jpg",
        houseCost: 0,
        hotelCost: 0
      }
    },
    {
      id: 2, name: "Delhi",
      price: 380, rent: 45,
      tier: PropertyTier.Luxury,
      color: PropertyColors.Red,
      type: "Property",
      details: {
        description: "Capital of India — luxury at its finest.",
        imageUrl: "properties/delhi.jpg",
        houseCost: 100,
        hotelCost: 300
      }
    },
    {
      id: 3, name: "Bangalore",
      price: 360, rent: 40,
      tier: PropertyTier.Luxury,
      color: PropertyColors.Red,
      type: "Property",
      details: {
        description: "Tech capital buzzing with innovation.",
        imageUrl: "properties/bangalore.jpg",
        houseCost: 95,
        hotelCost: 290
      }
    },
    {
      id: 4, name: "Hyderabad",
      price: 340, rent: 38,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "City of pearls and emerging startups.",
        imageUrl: "properties/hyderabad.jpg",
        houseCost: 90,
        hotelCost: 270
      }
    },
    {
      id: 5, name: "Chennai",
      price: 320, rent: 36,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "The cultural heart of South India.",
        imageUrl: "properties/chennai.jpg",
        houseCost: 85,
        hotelCost: 260
      }
    },
    {
      id: 6, name: "Kolkata",
      price: 310, rent: 34,
      tier: PropertyTier.Premium,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "The City of Joy, full of history.",
        imageUrl: "properties/kolkata.jpg",
        houseCost: 80,
        hotelCost: 250
      }
    },
    {
      id: 7, name: "Pune",
      price: 300, rent: 32,
      tier: PropertyTier.Premium,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Youthful energy and booming IT hub.",
        imageUrl: "properties/pune.jpg",
        houseCost: 75,
        hotelCost: 240
      }
    },
    {
      id: 8, name: "Ahmedabad",
      price: 290, rent: 30,
      tier: PropertyTier.Premium,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Vibrant heritage blended with modernity.",
        imageUrl: "properties/ahmedabad.jpg",
        houseCost: 70,
        hotelCost: 230
      }
    },
    {
      id: 9, name: "Jaipur",
      price: 280, rent: 28,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "The Pink City, royal and radiant.",
        imageUrl: "properties/jaipur.jpg",
        houseCost: 65,
        hotelCost: 220
      }
    },
    {
      id: 10, name: "Resort",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: "Utility",
      details: {
        description: "Relaxation spot! Take a break here.",
        imageUrl: "properties/resort.jpg",
        houseCost: 0,
        hotelCost: 0
      }
    },
    {
      id: 11, name: "Kanpur",
      price: 260, rent: 26,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "An industrial powerhouse on the rise.",
        imageUrl: "properties/kanpur.jpg",
        houseCost: 60,
        hotelCost: 210
      }
    },
    {
      id: 12, name: "Nagpur",
      price: 250, rent: 25,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "City of Oranges and vibrant trade.",
        imageUrl: "properties/nagpur.jpg",
        houseCost: 55,
        hotelCost: 200
      }
    },
    {
      id: 13, name: "Indore",
      price: 240, rent: 24,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Cleanest city, bustling with markets.",
        imageUrl: "properties/indore.jpg",
        houseCost: 50,
        hotelCost: 190
      }
    },
    {
      id: 14, name: "Bhopal",
      price: 230, rent: 23,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "The city of lakes and greenery.",
        imageUrl: "properties/bhopal.jpg",
        houseCost: 48,
        hotelCost: 185
      }
    },
    {
      id: 15, name: "Visakhapatnam",
      price: 220, rent: 22,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Coastal beauty with industrial strength.",
        imageUrl: "properties/visakhapatnam.jpg",
        houseCost: 45,
        hotelCost: 180
      }
    },
    {
      id: 16, name: "Surat",
      price: 210, rent: 21,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Diamond city and textile hub.",
        imageUrl: "properties/surat.jpg",
        houseCost: 43,
        hotelCost: 175
      }
    },
    {
      id: 17, name: "Vadodara",
      price: 200, rent: 20,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Art, culture, and royal heritage.",
        imageUrl: "properties/vadodara.jpg",
        houseCost: 40,
        hotelCost: 170
      }
    },
    {
      id: 18, name: "Patna",
      price: 190, rent: 19,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Historical charm meets modern development.",
        imageUrl: "properties/patna.jpg",
        houseCost: 38,
        hotelCost: 160
      }
    },
    {
      id: 19, name: "Party House",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.LightBlue,
      type: "Utility",
      details: {
        description: "Enjoy a fun party! Relax your mind.",
        imageUrl: "properties/party-house.jpg",
        houseCost: 0,
        hotelCost: 0
      }
    },
    {
      id: 20, name: "Chandigarh",
      price: 170, rent: 17,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "India's first planned city, beautifully clean.",
        imageUrl: "properties/chandigarh.jpg",
        houseCost: 35,
        hotelCost: 150
      }
    },
    {
      id: 21, name: "Guwahati",
      price: 160, rent: 16,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "Gateway to Northeast India’s beauty.",
        imageUrl: "properties/guwahati.jpg",
        houseCost: 33,
        hotelCost: 140
      }
    },
    {
      id: 22, name: "Raipur",
      price: 150, rent: 15,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Emerging city full of potential.",
        imageUrl: "properties/raipur.jpg",
        houseCost: 30,
        hotelCost: 130
      }
    },
    {
      id: 23, name: "Kochi",
      price: 140, rent: 14,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Queen of the Arabian Sea.",
        imageUrl: "properties/kochi.jpg",
        houseCost: 28,
        hotelCost: 125
      }
    },
    {
      id: 24, name: "Thiruvananthapuram",
      price: 100, rent: 10,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Kerala's capital, rich in tradition.",
        imageUrl: "properties/thiruvananthapuram.jpg",
        houseCost: 20,
        hotelCost: 100
      }
    },
    {
      id: 25, name: "Mysuru",
      price: 120, rent: 12,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Royal heritage and majestic palaces.",
        imageUrl: "properties/mysuru.jpg",
        houseCost: 25,
        hotelCost: 110
      }
    },
    {
      id: 26, name: "Madurai",
      price: 110, rent: 11,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Temple town with ancient glory.",
        imageUrl: "properties/madurai.jpg",
        houseCost: 23,
        hotelCost: 105
      }
    },
    {
      id: 27, name: "Coimbatore",
      price: 130, rent: 13,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Industrial city surrounded by nature.",
        imageUrl: "properties/coimbatore.jpg",
        houseCost: 27,
        hotelCost: 115
      }
    },
    {
      id: 28, name: "Jail",
      price: null, rent: null,
      tier: PropertyTier.Utility,
      color: PropertyColors.Red,
      type: "Utility",
      details: {
        description: "Oops! You're in jail. Miss a turn!",
        imageUrl: "properties/jail.jpg",
        houseCost: 0,
        hotelCost: 0
      }
    },
    {
      id: 29, name: "Amritsar",
      price: 85, rent: 8,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "Spiritual heart with Golden Temple.",
        imageUrl: "properties/amritsar.jpg",
        houseCost: 18,
        hotelCost: 85
      }
    },
    {
      id: 30, name: "Allahabad",
      price: 80, rent: 8,
      tier: PropertyTier.Basic,
      color: PropertyColors.Yellow,
      type: "Property",
      details: {
        description: "Historic city at the holy Sangam.",
        imageUrl: "properties/allahabad.jpg",
        houseCost: 17,
        hotelCost: 80
      }
    },
    {
      id: 31, name: "Agra",
      price: 75, rent: 7,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Home of the majestic Taj Mahal.",
        imageUrl: "properties/agra.jpg",
        houseCost: 15,
        hotelCost: 75
      }
    },
    {
      id: 32, name: "Varanasi",
      price: 70, rent: 7,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "One of the world's oldest cities.",
        imageUrl: "properties/varanasi.jpg",
        houseCost: 14,
        hotelCost: 70
      }
    },
    {
      id: 33, name: "Nashik",
      price: 65, rent: 6,
      tier: PropertyTier.Basic,
      color: PropertyColors.Green,
      type: "Property",
      details: {
        description: "Wine capital of India.",
        imageUrl: "properties/nashik.jpg",
        houseCost: 13,
        hotelCost: 65
      }
    },
    {
      id: 34, name: "Aurangabad",
      price: 60, rent: 6,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Historic caves and rich culture.",
        imageUrl: "properties/aurangabad.jpg",
        houseCost: 12,
        hotelCost: 60
      }
    },
    {
      id: 35, name: "Udaipur",
      price: 55, rent: 5,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "The City of Lakes and royalty.",
        imageUrl: "properties/udaipur.jpg",
        houseCost: 11,
        hotelCost: 55
      }
    },
    {
      id: 36, name: "Shillong",
      price: 50, rent: 5,
      tier: PropertyTier.Basic,
      color: PropertyColors.LightBlue,
      type: "Property",
      details: {
        description: "Scenic beauty of the northeast hills.",
        imageUrl: "properties/shillong.jpg",
        houseCost: 10,
        hotelCost: 50
      }
    },
  ];


  public getProperties(): Signal<PropertyCell[]> {
    return signal(this.#properties);
  }

  getPropertyById(id: number): PropertyCell {
    return this.#properties.find(property => property.id === id) as PropertyCell;
  }
}
