class Game {
    constructor(start, zrr) {
        this.start = start; // boolean (if the game is started)
        this.zrr = zrr; // Zrr zone
        this.initalTTL = 1;
    }
}

module.exports = Game;