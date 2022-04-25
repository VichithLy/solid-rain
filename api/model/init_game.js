const Game = require('./Game.js');
const Zrr = require('./Zrr.js');

const point_a = [0,0];
const point_b = [0,0];
const game = new Game(false, new Zrr(point_a, point_b));

module.exports = game;