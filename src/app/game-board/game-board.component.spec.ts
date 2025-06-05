import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { GameState, PropertyCell, Status, PropertyType, AvailableTokenColors, PropertyTier, PropertyColors } from '../models/game-board.models';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let gameService: jasmine.SpyObj<GameService>;
  let router: jasmine.SpyObj<Router>;
  let mockGameState: GameState;
  let mockProperties: PropertyCell[];

  beforeEach(async () => {
    mockGameState = {
      id: 'test-game-1',
      status: Status.Started,
      players: [
        { id: 'player1', name: 'Player 1', position: 0, properties: [], money: 1500, tokenColor: AvailableTokenColors.Red },
        { id: 'player2', name: 'Player 2', position: 0, properties: [], money: 1500, tokenColor: AvailableTokenColors.Green }
      ],
      currentPlayer: { id: 'player1', name: 'Player 1', position: 0, properties: [], money: 1500, tokenColor: AvailableTokenColors.Red },
      isCurrentPlayerAlreadyRolledTheDice: false,
      lastPlayedOn: new Date()
    };

    mockProperties = [
      {
        id: 0,
        name: 'GO',
        price: null,
        type: PropertyType.Start,
        rent: null,
        isOwned: false,
        isMortgaged: false,
        tier: PropertyTier.Utility,
        ownerId: undefined,
        color: PropertyColors.LightBlue,
        details: {
          description: "Collect ₹200 every time you pass Start!",
          imageUrl: "properties/start.jpg",
          houseCost: 0,
          hotelCost: 0
        }
      },
      {
        id: 1,
        name: 'Property 1',
        price: 100,
        type: PropertyType.Property,
        rent: 10,
        isOwned: false,
        isMortgaged: false,
        tier: PropertyTier.Basic,
        ownerId: undefined,
        color: PropertyColors.LightBlue,
        details: {
          description: "A basic property",
          imageUrl: "properties/property1.jpg",
          houseCost: 50,
          hotelCost: 150
        }
      }
    ];

    gameService = jasmine.createSpyObj('GameService', ['getProperties', 'getPropertyById'], {
      gameState: signal<GameState | undefined>(mockGameState)
    });
    gameService.getProperties.and.returnValue(signal(mockProperties));
    gameService.getPropertyById.and.callFake((id: number) => {
      const property = mockProperties.find(p => p.id === id);
      if (!property) {
        throw new Error(`Property with id ${id} not found`);
      }
      return property;
    });

    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 'test-game-1' }
            }
          }
        }
      ]
    }).compileComponents();

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockGameState));
    spyOn(localStorage, 'setItem');

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct game state', () => {
    const currentState = component['gameState']();
    expect(currentState?.id).toBe(mockGameState.id);
    expect(currentState?.status).toBe(mockGameState.status);
    expect(currentState?.players).toEqual(mockGameState.players);
    expect(currentState?.currentPlayer).toEqual(mockGameState.currentPlayer);
    expect(currentState?.isCurrentPlayerAlreadyRolledTheDice).toBe(mockGameState.isCurrentPlayerAlreadyRolledTheDice);
  });

  it('should get correct player color', () => {
    const color = (component as any).getPlayerColor('player1');
    expect(color).toBe(AvailableTokenColors.Red);
  });

  describe('rollDice', () => {
    it('should update game state when rolling dice', fakeAsync(() => {
      (component as any).rollDice();
      expect(component['isRolling']).toBeTrue();
      expect(component['gameState']()?.status).toBe(Status.RollingDice);

      // Fast forward to end of roll animation
      tick(2000);

      expect(component['isRolling']).toBeFalse();
      expect(component['gameState']()?.isCurrentPlayerAlreadyRolledTheDice).toBeTrue();
      expect(component['gameState']()?.status).toBe(Status.RolledDice);

      // Clear any remaining timers
      tick(25000);
    }));

    it('should start countdown after rolling', fakeAsync(() => {
      (component as any).rollDice();
      tick(2000);

      expect(component['showTimer']()).toBeTrue();
      expect(component['timer']()).toBe(25);

      // Fast forward to end of timer
      tick(25000);

      expect(component['showTimer']()).toBeFalse();
      expect(component['timer']()).toBe(0);
    }));
  });

  describe('endTurn', () => {
    it('should update game state and switch to next player', () => {
      (component as any).endTurn();

      const updatedState = component['gameState']();
      expect(updatedState?.currentPlayer.id).toBe('player2');
      expect(updatedState?.isCurrentPlayerAlreadyRolledTheDice).toBeFalse();
      expect(updatedState?.status).toBe(Status.EndTurn);
    });

    it('should clear timer when manually ending turn', fakeAsync(() => {
      // Start a turn with timer
      (component as any).rollDice();
      tick(2000);

      expect(component['showTimer']()).toBeTrue();

      // End turn manually
      (component as any).endTurn();

      expect(component['showTimer']()).toBeFalse();
      // We can't test currentTimerId directly as it's private
      // Instead, we verify the timer is cleared by checking if the automatic end turn doesn't happen
      tick(25000);
      expect(component['gameState']()?.currentPlayer.id).toBe('player2');

      // Clear any remaining intervals
      tick(100000);
      discardPeriodicTasks();
    }));
  });

  describe('timer management', () => {
    it('should automatically end turn when timer expires', fakeAsync(() => {
      (component as any).rollDice();
      tick(2000); // Wait for roll animation

      const initialPlayer = component['gameState']()?.currentPlayer.id;

      tick(25000); // Wait for timer to expire

      const newPlayer = component['gameState']()?.currentPlayer.id;
      expect(newPlayer).not.toBe(initialPlayer);
      expect(component['showTimer']()).toBeFalse();

      // Flush any remaining timers
      tick(100000);
      discardPeriodicTasks();
    }));
  });
});
