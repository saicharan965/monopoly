const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

// In-memory game state
const games = new Map();
const players = new Map();

// Game room management
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("createGame", ({ playerName, maxPlayers }) => {
    const gameId = uuidv4();
    const player = {
      id: socket.id,
      name: playerName,
      money: 15000,
      position: 0,
      properties: [],
    };

    const gameState = {
      id: gameId,
      players: [player],
      currentPlayer: 0,
      properties: initializeProperties(),
      started: false,
      maxPlayers,
    };

    games.set(gameId, gameState);
    players.set(socket.id, gameId);

    socket.join(gameId);
    socket.emit("gameCreated", { gameId, gameState });
  });

  socket.on("joinGame", ({ gameId, playerName }) => {
    const game = games.get(gameId);
    if (!game) {
      socket.emit("joinError", "Game not found");
      return;
    }

    if (game.started) {
      socket.emit("joinError", "Game has already started");
      return;
    }

    if (game.players.length >= game.maxPlayers) {
      socket.emit("joinError", "Game is full");
      return;
    }

    const player = {
      id: socket.id,
      name: playerName,
      money: 15000,
      position: 0,
      properties: [],
    };

    game.players.push(player);
    players.set(socket.id, gameId);

    socket.join(gameId);
    io.to(gameId).emit("gameStateUpdate", game);
  });

  socket.on("startGame", (gameId) => {
    const game = games.get(gameId);
    if (
      game &&
      game.players.length >= 2 &&
      game.players.length <= game.maxPlayers
    ) {
      game.started = true;
      io.to(gameId).emit("gameStateUpdate", game);
    }
  });

  socket.on("rollDice", (gameId) => {
    const game = games.get(gameId);
    if (!game || !game.started) return;

    const currentPlayer = game.players[game.currentPlayer];
    if (currentPlayer.id !== socket.id) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    const newPosition = (currentPlayer.position + roll) % 40;
    currentPlayer.position = newPosition;

    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;

    io.to(gameId).emit("gameStateUpdate", game);
    io.to(gameId).emit("diceRolled", { playerId: socket.id, roll });
  });

  socket.on("disconnect", () => {
    const gameId = players.get(socket.id);
    if (gameId) {
      const game = games.get(gameId);
      if (game) {
        game.players = game.players.filter((p) => p.id !== socket.id);
        if (game.players.length === 0) {
          games.delete(gameId);
        } else {
          io.to(gameId).emit("gameStateUpdate", game);
        }
      }
      players.delete(socket.id);
    }
  });
});

function initializeProperties() {
  return [
    {
      id: 0,
      name: "Start",
      type: "corner",
      price: 0,
      rent: 0,
      houses: 0,
      tier: 1,
    },
    {
      id: 1,
      name: "Mumbai",
      type: "property",
      price: 6000,
      rent: 600,
      houses: 0,
      tier: 1,
    },
    {
      id: 2,
      name: "Delhi",
      type: "property",
      price: 5500,
      rent: 550,
      houses: 0,
      tier: 1,
    },
    {
      id: 3,
      name: "Chance",
      type: "chance",
      price: 0,
      rent: 0,
      houses: 0,
      tier: 1,
    },
    {
      id: 4,
      name: "Bangalore",
      type: "property",
      price: 5000,
      rent: 500,
      houses: 0,
      tier: 1,
    },
    {
      id: 5,
      name: "Chennai",
      type: "property",
      price: 4800,
      rent: 480,
      houses: 0,
      tier: 1,
    },
    {
      id: 6,
      name: "Community Chest",
      type: "community",
      price: 0,
      rent: 0,
      houses: 0,
      tier: 1,
    },
    {
      id: 7,
      name: "Kolkata",
      type: "property",
      price: 4500,
      rent: 450,
      houses: 0,
      tier: 1,
    },
    {
      id: 8,
      name: "Income Tax",
      type: "tax",
      price: 2000,
      rent: 0,
      houses: 0,
      tier: 1,
    },
    {
      id: 9,
      name: "Hyderabad",
      type: "property",
      price: 4000,
      rent: 400,
      houses: 0,
      tier: 1,
    },
    {
      id: 10,
      name: "Jail",
      type: "corner",
      price: 0,
      rent: 0,
      houses: 0,
      tier: 1,
    },
  ];
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
