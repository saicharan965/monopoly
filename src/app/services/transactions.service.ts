import { inject, Injectable } from "@angular/core";
import { PropertiesService } from "./properties.service";
import { PlayerService } from "./player.service";
@Injectable({
  providedIn: "root",
})

export class TransactionsService {
  #propertyService = inject(PropertiesService);
  #playerService = inject(PlayerService);
  protected buyProperty(propertyId: number, playerId: string): void {
    const property = this.#propertyService.getPropertyById(propertyId);
    if (!property) {
      throw new Error(`Property with id ${propertyId} not found`);
    }
    if (property.isOwned) {
      throw new Error(`Property with id ${propertyId} is already owned`);
    }
    property.isOwned = true;
    property.ownerId = playerId;
    property.ownerName = this.#playerService.getPlayerNameById(playerId);
  }
}
