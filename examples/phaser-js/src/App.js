/* eslint-disable */
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import * as Constants from './constants';

import { createGameView, getGameView } from './GameView';

let visibleTiles;
let cursors;

const preload = () => {
  game.load.image('grass', '../assets/grass.png');
  game.load.image('water', '../assets/water.png');
}

const render = () => {
	game.debug.text(game.time.fps, 2, 14, "#00ff00");
}

const create = (screen) => () => {
  console.log(1, screen);
  createGameView(game, screen);
}

const update = () => {
  getGameView().update();
}

class Game extends Phaser.Game {
  constructor() {
    const screen = {
      x: document.documentElement.clientWidth,
      y: document.documentElement.clientHeight,
    };
    super(
      screen.x,
      screen.y,
      Phaser.CANVAS,
      'content',
      { preload, create: create(screen), update, render }
    );
  }
}

window.game = new Game(); // eslint-disable-line
