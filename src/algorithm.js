
import * as Helpers from './helpers';

let config;
let tiles;

const initTile = (a, b, anchor) => {
  const { i, j } = Helpers.convertArrayIndexToIso(a, b); // Compute i,j coordinates
  const { x, y } = Helpers.convertIsoToScreenXY(config.TILE)(i, j); // Compute x,y position
  const u = { i: i + anchor.i, j: j + anchor.j };
  const id = Helpers.computeTileId(config.BOARD)(u);
  const onMap = Helpers.isTileOnMap(config.BOARD)(u);
  const tile = config.addTile(x, y, { onMap, id, u });
  return tile;
};

const newTile = ({ a, b, anchor, move: { axis }}) => {
  const tile = tiles[axis === 'x' ? config.TILE_AREA.x - (a + 1) : a][axis === 'y' ? config.TILE_AREA.y - (b + 1) : b];
  config.removeTile(tile); // for every tile added, a tile on the opposite side is destroyed
  return initTile(a, b, anchor);
};

const oldTile = ({ move: { axis, dir }, a, b}) => {
  const tile = tiles[axis === 'x' ? a + (dir * 2) : a][axis === 'y' ? b + dir : b];
  tile.group[axis] -= (dir * config.TILE[axis]); // shift tile
  return tile;
};

const createTile = ({ move: { replace, ...move }, ...other }) => (a, b) =>
  replace({ a, b }) ? newTile({ ...other, move, a, b }) : oldTile({ ...other, move, a, b });

const performCheck = ({ compare, combine, move: { axis }}) =>
  compare(
    config.getLocation()[axis],
    combine(config.ORIGIN[axis], config.TILE[axis])
  );

// Check to see if visibleGroup has moved enough to warrant deleting or adding a column or row of tiles
const shouldUpdateTiles = move => performCheck({
  compare: move.dir === -1 ? Helpers.gte : Helpers.lte,
  combine: move.dir === -1 ? Helpers.add : Helpers.subtract,
  move,
});

const resetAxis = move => {
  config.setLocation(move.axis, config.ORIGIN[move.axis]);
};

const updateAxis = move => {
  config.updateLocation(move.axis, -move.dir * config.SCROLL_VELOCITY);
}

const determineDelta = move => [move.dir, move.axis === 'x' ? -move.dir : move.dir];

const createTiles = (move) => {
  const delta = determineDelta(move);
  const anchor = getAnchor(delta);
  tiles = Helpers.initialize2DArray(
    config.TILE_AREA.x,
    config.TILE_AREA.y,
    createTile({ move, anchor, delta }),
  );
}

const getAnchor = (delta) => ({ i: tiles[0][0].u.i + delta[0], j: tiles[0][0].u.j + delta[1] });

const tileManager = (direction) => {
  const moves = {
    right: {
      axis: 'x',
      dir: 1,
      replace: ({ a }) => a >= config.TILE_AREA.x - 2,
    },
    left: {
      axis: 'x',
      dir: -1,
      replace: ({ a }) => a <= 1,
    },
    up: {
      axis: 'y',
      dir: -1,
      replace: ({ b }) => b <= 0,
    },
    down: {
      axis: 'y',
      dir: 1,
      replace: ({ b }) => b >= config.TILE_AREA.y - 1,
    },
  };

  const move = moves[direction];

  updateAxis(move);
  if (shouldUpdateTiles(move)) {
    createTiles(move);
    resetAxis(move);
  }
};

const initialize = () => {
  config.setLocation('x', config.ORIGIN.x);
  config.setLocation('y', config.ORIGIN.y);
  tiles = Helpers.initialize2DArray(
    config.TILE_AREA.x,
    config.TILE_AREA.y,
    (a, b) => initTile(a, b, { i: 0, j: 0 }),
  );
}

const configure = (c) =>  {
  config = c;

  // compute the buffer tiles for the screen
  let BUFFER_TILES = (Math.floor(config.BUFFER / config.TILE.y) * 2);
  BUFFER_TILES = BUFFER_TILES - (BUFFER_TILES % 2);

  // compute the number of tiles for the screen
  config.TILE_AREA = {};
  config.TILE_AREA.x = (Math.ceil(config.SCREEN.x / config.TILE.x) * 2) + BUFFER_TILES;
  config.TILE_AREA.y = Math.ceil(config.SCREEN.y / config.TILE.y) + BUFFER_TILES;

  // compute the origin of the visibleGroup
  config.ORIGIN = {};
  config.ORIGIN.x = (BUFFER_TILES / 4) * config.TILE.x * -1;
  config.ORIGIN.y = (BUFFER_TILES / 2) * config.TILE.y * -1;

  return {
    tileManager,
    initialize,
  };
}


export default {
  configure,
  util: {
    getTileById: (id) =>                            Helpers.getTile(config.BOARD, config.TILE_AREA, tiles)(id),
    vertexOfWhichTileByPoint: (point, accuracy) => Helpers.vertexOfWhichTileClicked(tiles, config.TILE, accuracy)(point),
    whichTileByPoint: (point) =>                   Helpers.whichTileClicked(tiles, config.TILE)(point),
  },
};
