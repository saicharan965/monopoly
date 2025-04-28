import { Injectable } from "@angular/core";
import { PropertyCell, PropertyColors, PropertyTier } from "../models/game-board.models";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class GameService {
  #properties: PropertyCell[] = [
    {
      id: 1, name: "Start", price: null, rent: null, tier: PropertyTier.Utility, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 2, name: "Delhi", price: 380, rent: 45, tier: PropertyTier.Luxury, color: PropertyColors.Red,
      type: "Property"
    },
    {
      id: 3, name: "Bangalore", price: 360, rent: 40, tier: PropertyTier.Luxury, color: PropertyColors.Red,
      type: "Property"
    },
    {
      id: 4, name: "Hyderabad", price: 340, rent: 38, tier: PropertyTier.Premium, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 5, name: "Chennai", price: 320, rent: 36, tier: PropertyTier.Premium, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 6, name: "Kolkata", price: 310, rent: 34, tier: PropertyTier.Premium, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 7, name: "Pune", price: 300, rent: 32, tier: PropertyTier.Premium, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 8, name: "Ahmedabad", price: 290, rent: 30, tier: PropertyTier.Premium, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 9, name: "Jaipur", price: 280, rent: 28, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 10, name: "Resort", price: null, rent: null, tier: PropertyTier.Utility, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 11, name: "Kanpur", price: 260, rent: 26, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 12, name: "Nagpur", price: 250, rent: 25, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 13, name: "Indore", price: 240, rent: 24, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 14, name: "Bhopal", price: 230, rent: 23, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 15, name: "Visakhapatnam", price: 220, rent: 22, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 16, name: "Surat", price: 210, rent: 21, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 17, name: "Vadodara", price: 200, rent: 20, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 18, name: "Patna", price: 190, rent: 19, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 19, name: "Party House", price: null, rent: null, tier: PropertyTier.Utility, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 20, name: "Chandigarh", price: 170, rent: 17, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 21, name: "Guwahati", price: 160, rent: 16, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 22, name: "Raipur", price: 150, rent: 15, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 23, name: "Kochi", price: 140, rent: 14, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 24, name: "Coimbatore", price: 130, rent: 13, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 25, name: "Mysuru", price: 120, rent: 12, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 26, name: "Madurai", price: 110, rent: 11, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 27, name: "Thiruvananthapuram", price: 100, rent: 10, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 28, name: "Jail", price: null, rent: null, tier: PropertyTier.Utility, color: PropertyColors.Red,
      type: "Property"
    },
    {
      id: 29, name: "Amritsar", price: 85, rent: 8, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 30, name: "Allahabad", price: 80, rent: 8, tier: PropertyTier.Basic, color: PropertyColors.Yellow,
      type: "Property"
    },
    {
      id: 31, name: "Agra", price: 75, rent: 7, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 32, name: "Varanasi", price: 70, rent: 7, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 33, name: "Nashik", price: 65, rent: 6, tier: PropertyTier.Basic, color: PropertyColors.Green,
      type: "Property"
    },
    {
      id: 34, name: "Aurangabad", price: 60, rent: 6, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 35, name: "Udaipur", price: 55, rent: 5, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
    {
      id: 36, name: "Shillong", price: 50, rent: 5, tier: PropertyTier.Basic, color: PropertyColors.LightBlue,
      type: "Property"
    },
  ];

  public getProperties(): Observable<PropertyCell[]> {
    return of(this.#properties);
  }
}
