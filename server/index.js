const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

const games = new Map();
const players = new Map();

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
    console.log(gameState.maxPlayers)
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
  const filePath = path.join(__dirname, "./properties.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
