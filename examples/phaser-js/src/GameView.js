import Phaser from 'phaser';
import * as R from 'ramda';

import * as Constants from './constants';

let gameView;

import IR from '../iso-rect-algorithm';

// const mapXYtoScreenXY = (x, y) => {
//   return {
//     x: (x - y) * (Constants.TILE.x / 2),
//     y: (x + y) * (Constants.TILE.y / 2),
//   }
// }

class GameView {
  constructor(game, screen) {
    // intialize some game parameters
    this.game = game;
    this.game.time.advancedTiming = true;
    this.game.camera.x = 0;
    this.game.camera.y = 0;
    this.game.input.onDown.add(this.handleClick);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // create the container and assign the origin
    this.container = this.game.add.group();

    const { initialize, tileManager } = IR.configure({
      SCREEN: screen,
      TILE: Constants.TILE,
      BUFFER: Constants.WINDOW_BUFFER,
      BOARD: Constants.BOARD,
      SCROLL_VELOCITY: Constants.SCROLL_VELOCITY,
      setLocation: this.setLocation,
      getLocation: this.getLocation,
      updateLocation: this.updateLocation,
      removeTile: this.removeTile,
      addTile: this.addTile,
    });

    initialize();
    this.tileManager = tileManager;
  }

  handleClick = (e) => {
    // Consider buffer offset
    const x = e.worldX - this.container.x - (Constants.TILE.x / 2); // Not sure why we need this
    const y = e.worldY - this.container.y;
    const tile = IR.util.vertexOfWhichTileClicked({ x, y });
    console.log(tile);
    if (tile) {
      console.log('tile: ', tile.id);
      console.log(IR.util.getTile(tile.id));
    }
    // const tileClicked = IR.util.whichTileClicked({ x, y });
    // console.log('tileClicked: ', tileClicked.id);
  }

  computeTile = async (tile) => {
    // Simulate retrieving Fake get data
    await new Promise((resolve) => setTimeout(resolve, Math.random() * Constants.FAKE_DATA_SIMLUATION));
     // eslint-disable-line
    const isWater = tile.onMap;
    const background = this.game.add.sprite(0, 0, isWater ? 'water' : 'grass');
    tile.group.add(background);
    tile.group.addChild(this.game.make.text(60, 28, `${tile.id}`, { font: '11px', fill: '#FFFFFF' }));
  }

  addTile = (x, y, tile) => {
    const group = this.game.add.group();
    group.x = x;
    group.y = y;
    tile.group = group;
    this.container.add(group);
    this.computeTile(tile);
    return tile;
  }

  removeTile = (tile) => { tile.group.destroy(true, false); }
  updateLocation = (axis, val) => { this.container[axis] += val; }
  setLocation = (axis, val) => { this.container[axis] = val; }
  getLocation = () => ({ x: this.container.x, y: this.container.y });

  update = () => {
    const arrows = ['right', 'left', 'up', 'down']
    R.forEach(
      R.ifElse(
        (a) => this.cursors[a].isDown,
        this.tileManager,
        () => {},
      ),
      arrows,
    );
  }
}

export const createGameView = (game, screen) => {
  gameView = new GameView(game, screen);
};

export const getGameView = () => gameView;
