
export const gte = (v1, v2) => v1 >= v2;
export const lte = (v1, v2) => v1 <= v2;
export const add = (v1, v2) => v1 + v2;
export const subtract = (v1, v2) => v1 - v2;

export const computeTileId = (BOARD) => ({ i, j }) => (i * BOARD.h) + j;

export const convertIdToAbsIso = (BOARD) => (id) => {
  const i = ~~(id / BOARD.h);
  const j = id - (i * BOARD.h);
  return { i, j };
};

export const convertAbsIsoToLocalIso = (anchor) => ({ i, j }) => ({ i: i - anchor.u.i, j: j - anchor.u.j });

export const convertArrayIndexToIso = (a, b) => {
  const i = (b + a) - ~~(a / 2);
  const j = b - ~~(a / 2);
  return { i, j };
};

export const convertIsoToArrayIndex = ({ i, j }) => {
  const a = i - j;
  const b = ~~((j + i) / 2);
  return { a, b };
};

export const convertIsoToScreenXY = (TILE) => (i, j) => {
  const x = (i - j) * (TILE.x / 2);
  const y = (i + j) * (TILE.y / 2);
  return { x, y };
};

export const convertScreenXYToIso = (TILE) => (x, y) => {
  const i = ((x / TILE.x) + (y / TILE.y));
  const j = ((y / TILE.y) - (x / TILE.x));
  return { i: ~~i, j: ~~j, ir: i % 1, jr: j % 1 };
};

export const create2DArray = (w, h) => {
  let array = new Array(w);
  for (let i = 0; i < w; i++) {
    array[i] = new Array(h);
  }
  return array;
};

export const initialize2DArray = (w, h, fn = (i, j) => [i, j]) => {
  const array = create2DArray(w, h);
  for (let a = 0; a < w; a += 1) {
    for (let b = 0; b < h; b += 1) {
      array[a][b] = fn(a, b);
    }
  }
  return array;
};

export const getTile = (BOARD, TILE_AREA, tiles) => (tileId) => {
  const coor = convertAbsIsoToLocalIso(tiles[0][0])(convertIdToAbsIso(BOARD)(tileId));
  const { a, b } = convertIsoToArrayIndex(coor);
  if ((a >= 0 && a < TILE_AREA.x) && (b >= 0 && b < TILE_AREA.y)) {
    return tiles[a][b];
  }
  return null
};

export const whichTileClicked = (tiles, TILE) => ({ x, y }) => {
  const coor = convertScreenXYToIso(TILE)(x, y);
  const { a, b } = convertIsoToArrayIndex(coor);
  return tiles[a][b];
};

export const vertexOfWhichTileClicked =  (tiles, TILE, POINT_ACCURACY = 0.15) => ({ x, y }) => {
  const { i, j, ir, jr } = convertScreenXYToIso(TILE)(x, y);

  const corners = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const p = corners.find(
    (c) =>  Math.abs(c[0] - ir) < POINT_ACCURACY && Math.abs(c[1] - jr) < POINT_ACCURACY,
  );

  if (p !== null && p !== undefined) {
    const { a, b } = convertIsoToArrayIndex({ i: i + p[0], j: j + p[1] });
    return tiles[a][b];
  }

  return null;
};

export const isTileOnMap = (BOARD) => ({ i, j }) => (i < 0 || j < 0) || (i > BOARD.h - 1 || j > BOARD.w - 1);
