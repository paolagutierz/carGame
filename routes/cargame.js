const express = require("express");
const router = express.Router();
const Player = require("./../models/player");

router.post("/conductores", (req, res) => {
  res.render("conductores", { numberOfCars: req.body.cars });
});

router.post("/game", (req, res) => {
  const players = [];

  for (let i = 1; i <= req.body.numberOfCars; i++) {
    const player = { name: req.body[`jugador${i}`] };
    players.push(player);
  }

  const cars = ["yellow", "red", "blue", "purple"];
  res.render("game", {
    numberOfCars: req.body.numberOfCars,
    cars: cars,
    players: players,
  });
});

router.post("/save", async (req, res) => {
  const names = req.body.names;
  const ids = req.body.ids;
  const players = [];

  if (ids && ids[0]) {
    for (let i = 0; i < req.body.numberOfCars; i++) {
      let player = await Player.findById(ids[i]);
      if (req.body.isWinner[i] === "true") {
        console.log(player.name);
        player.winTimes = Number(player.winTimes) + 1;
      }
      player = await player.save();
      players.push(player);
    }
  } else {
    for (let i = 0; i < req.body.numberOfCars; i++) {
      let player = new Player();
      player.name = names[i];
      if (req.body.isWinner[i] === "true") {
        console.log(player.name);
        player.winTimes = 1;
      }

      player = await player.save();
      players.push(player);
    }
  }

  const cars = ["yellow", "red", "blue", "purple"];
  res.render("game", {
    numberOfCars: req.body.numberOfCars,
    cars: cars,
    players: players,
  });
});

module.exports = router;
