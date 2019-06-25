const namespace = {};

const schacht = require('./player.js');
const lehrer = require('./player.js');

game1 = require('./game.js');
game2 = require('./game.js');
game3 = require('./game.js');
const game4 = require('./game.js');
const game5 = require('./game.js');
const game6 = require('./game.js');
const game7 = require('./game.js');
const game8 = require('./game.js');

let buzzed = false;

exports.setGameWinner = (gameNumber, winner) => {
  // [`game${gameNumber}`].winner = winner;
  console.log(namespace['game4'].winner);
};

// eslint-disable-next-line no-template-curly-in-string
exports.getGameWinner = gameNumber => 'module[`game${gameNumber}`].winner';

exports.buzzed = () => {
  buzzed = true;
};

exports.answered = () => {
  buzzed = false;
};

exports.isAnswering = () => buzzed;
