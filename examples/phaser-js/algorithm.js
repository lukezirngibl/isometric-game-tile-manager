(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var gte = exports.gte = function gte(v1, v2) {
  return v1 >= v2;
};
var lte = exports.lte = function lte(v1, v2) {
  return v1 <= v2;
};
var add = exports.add = function add(v1, v2) {
  return v1 + v2;
};
var subtract = exports.subtract = function subtract(v1, v2) {
  return v1 - v2;
};

var computeTileId = exports.computeTileId = function computeTileId(BOARD) {
  return function (_ref) {
    var i = _ref.i,
        j = _ref.j;
    return i * BOARD.h + j;
  };
};

var convertIdToAbsIso = exports.convertIdToAbsIso = function convertIdToAbsIso(BOARD) {
  return function (id) {
    var i = ~~(id / BOARD.h);
    var j = id - i * BOARD.h;
    return { i: i, j: j };
  };
};

var convertAbsIsoToLocalIso = exports.convertAbsIsoToLocalIso = function convertAbsIsoToLocalIso(anchor) {
  return function (_ref2) {
    var i = _ref2.i,
        j = _ref2.j;
    return { i: i - anchor.u.i, j: j - anchor.u.j };
  };
};

var convertArrayIndexToIso = exports.convertArrayIndexToIso = function convertArrayIndexToIso(a, b) {
  var i = b + a - ~~(a / 2);
  var j = b - ~~(a / 2);
  return { i: i, j: j };
};

var convertIsoToArrayIndex = exports.convertIsoToArrayIndex = function convertIsoToArrayIndex(_ref3) {
  var i = _ref3.i,
      j = _ref3.j;

  var a = i - j;
  var b = ~~((j + i) / 2);
  return { a: a, b: b };
};

var convertIsoToScreenXY = exports.convertIsoToScreenXY = function convertIsoToScreenXY(TILE) {
  return function (i, j) {
    var x = (i - j) * (TILE.x / 2);
    var y = (i + j) * (TILE.y / 2);
    return { x: x, y: y };
  };
};

var convertScreenXYToIso = exports.convertScreenXYToIso = function convertScreenXYToIso(TILE) {
  return function (x, y) {
    var i = x / TILE.x + y / TILE.y;
    var j = y / TILE.y - x / TILE.x;
    return { i: ~~i, j: ~~j, ir: i % 1, jr: j % 1 };
  };
};

var create2DArray = exports.create2DArray = function create2DArray(w, h) {
  var array = new Array(w);
  for (var i = 0; i < w; i++) {
    array[i] = new Array(h);
  }
  return array;
};

var initialize2DArray = exports.initialize2DArray = function initialize2DArray(w, h) {
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (i, j) {
    return [i, j];
  };

  var array = create2DArray(w, h);
  for (var a = 0; a < w; a += 1) {
    for (var b = 0; b < h; b += 1) {
      array[a][b] = fn(a, b);
    }
  }
  return array;
};

var getTile = exports.getTile = function getTile(BOARD, TILE_AREA, tiles) {
  return function (tileId) {
    var coor = convertAbsIsoToLocalIso(tiles[0][0])(convertIdToAbsIso(BOARD)(tileId));

    var _convertIsoToArrayInd = convertIsoToArrayIndex(coor),
        a = _convertIsoToArrayInd.a,
        b = _convertIsoToArrayInd.b;

    if (a >= 0 && a < TILE_AREA.x && b >= 0 && b < TILE_AREA.y) {
      return tiles[a][b];
    }
    return null;
  };
};

var whichTileClicked = exports.whichTileClicked = function whichTileClicked(tiles, TILE) {
  return function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y;

    var coor = convertScreenXYToIso(TILE)(x, y);

    var _convertIsoToArrayInd2 = convertIsoToArrayIndex(coor),
        a = _convertIsoToArrayInd2.a,
        b = _convertIsoToArrayInd2.b;

    return tiles[a][b];
  };
};

var vertexOfWhichTileClicked = exports.vertexOfWhichTileClicked = function vertexOfWhichTileClicked(tiles, TILE) {
  var POINT_ACCURACY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.15;
  return function (_ref5) {
    var x = _ref5.x,
        y = _ref5.y;

    var _convertScreenXYToIso = convertScreenXYToIso(TILE)(x, y),
        i = _convertScreenXYToIso.i,
        j = _convertScreenXYToIso.j,
        ir = _convertScreenXYToIso.ir,
        jr = _convertScreenXYToIso.jr;

    var corners = [[0, 0], [0, 1], [1, 0], [1, 1]];
    var p = corners.find(function (c) {
      return Math.abs(c[0] - ir) < POINT_ACCURACY && Math.abs(c[1] - jr) < POINT_ACCURACY;
    });

    if (p !== null && p !== undefined) {
      var _convertIsoToArrayInd3 = convertIsoToArrayIndex({ i: i + p[0], j: j + p[1] }),
          a = _convertIsoToArrayInd3.a,
          b = _convertIsoToArrayInd3.b;

      return tiles[a][b];
    }

    return null;
  };
};

var isTileOnMap = exports.isTileOnMap = function isTileOnMap(BOARD) {
  return function (_ref6) {
    var i = _ref6.i,
        j = _ref6.j;
    return i < 0 || j < 0 || i > BOARD.h - 1 || j > BOARD.w - 1;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _helpers = __webpack_require__(0);

var Helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var config = void 0;
var tiles = void 0;

var initTile = function initTile(a, b, anchor) {
  var _Helpers$convertArray = Helpers.convertArrayIndexToIso(a, b),
      i = _Helpers$convertArray.i,
      j = _Helpers$convertArray.j; // Compute i,j coordinates


  var _Helpers$convertIsoTo = Helpers.convertIsoToScreenXY(config.TILE)(i, j),
      x = _Helpers$convertIsoTo.x,
      y = _Helpers$convertIsoTo.y; // Compute x,y position


  var u = { i: i + anchor.i, j: j + anchor.j };
  var id = Helpers.computeTileId(config.BOARD)(u);
  var onMap = Helpers.isTileOnMap(config.BOARD)(u);
  var tile = config.addTile(x, y, { onMap: onMap, id: id, u: u });
  return tile;
};

var newTile = function newTile(_ref) {
  var a = _ref.a,
      b = _ref.b,
      anchor = _ref.anchor,
      axis = _ref.move.axis;

  var tile = tiles[axis === 'x' ? config.TILE_AREA.x - (a + 1) : a][axis === 'y' ? config.TILE_AREA.y - (b + 1) : b];
  config.removeTile(tile); // for every tile added, a tile on the opposite side is destroyed
  return initTile(a, b, anchor);
};

var oldTile = function oldTile(_ref2) {
  var _ref2$move = _ref2.move,
      axis = _ref2$move.axis,
      dir = _ref2$move.dir,
      a = _ref2.a,
      b = _ref2.b;

  var tile = tiles[axis === 'x' ? a + dir * 2 : a][axis === 'y' ? b + dir : b];
  tile.group[axis] -= dir * config.TILE[axis]; // shift tile
  return tile;
};

var createTile = function createTile(_ref3) {
  var _ref3$move = _ref3.move,
      replace = _ref3$move.replace,
      move = _objectWithoutProperties(_ref3$move, ['replace']),
      other = _objectWithoutProperties(_ref3, ['move']);

  return function (a, b) {
    return replace({ a: a, b: b }) ? newTile(_extends({}, other, { move: move, a: a, b: b })) : oldTile(_extends({}, other, { move: move, a: a, b: b }));
  };
};

var performCheck = function performCheck(_ref4) {
  var compare = _ref4.compare,
      combine = _ref4.combine,
      axis = _ref4.move.axis;
  return compare(config.getLocation()[axis], combine(config.ORIGIN[axis], config.TILE[axis]));
};

// Check to see if visibleGroup has moved enough to warrant deleting or adding a column or row of tiles
var shouldUpdateTiles = function shouldUpdateTiles(move) {
  return performCheck({
    compare: move.dir === -1 ? Helpers.gte : Helpers.lte,
    combine: move.dir === -1 ? Helpers.add : Helpers.subtract,
    move: move
  });
};

var resetAxis = function resetAxis(move) {
  config.setLocation(move.axis, config.ORIGIN[move.axis]);
};

var updateAxis = function updateAxis(move) {
  config.updateLocation(move.axis, -move.dir * config.SCROLL_VELOCITY);
};

var determineDelta = function determineDelta(move) {
  return [move.dir, move.axis === 'x' ? -move.dir : move.dir];
};

var createTiles = function createTiles(move) {
  var delta = determineDelta(move);
  var anchor = getAnchor(delta);
  tiles = Helpers.initialize2DArray(config.TILE_AREA.x, config.TILE_AREA.y, createTile({ move: move, anchor: anchor, delta: delta }));
};

var getAnchor = function getAnchor(delta) {
  return { i: tiles[0][0].u.i + delta[0], j: tiles[0][0].u.j + delta[1] };
};

var tileManager = function tileManager(direction) {
  var moves = {
    right: {
      axis: 'x',
      dir: 1,
      replace: function replace(_ref5) {
        var a = _ref5.a;
        return a >= config.TILE_AREA.x - 2;
      }
    },
    left: {
      axis: 'x',
      dir: -1,
      replace: function replace(_ref6) {
        var a = _ref6.a;
        return a <= 1;
      }
    },
    up: {
      axis: 'y',
      dir: -1,
      replace: function replace(_ref7) {
        var b = _ref7.b;
        return b <= 0;
      }
    },
    down: {
      axis: 'y',
      dir: 1,
      replace: function replace(_ref8) {
        var b = _ref8.b;
        return b >= config.TILE_AREA.y - 1;
      }
    }
  };

  var move = moves[direction];

  updateAxis(move);
  if (shouldUpdateTiles(move)) {
    createTiles(move);
    resetAxis(move);
  }
};

var initialize = function initialize() {
  config.setLocation('x', config.ORIGIN.x);
  config.setLocation('y', config.ORIGIN.y);
  tiles = Helpers.initialize2DArray(config.TILE_AREA.x, config.TILE_AREA.y, function (a, b) {
    return initTile(a, b, { i: 0, j: 0 });
  });
};

var configure = function configure(c) {
  config = c;

  // compute the buffer tiles for the screen
  var BUFFER_TILES = Math.floor(config.BUFFER / config.TILE.y) * 2;
  BUFFER_TILES = BUFFER_TILES - BUFFER_TILES % 2;

  // compute the number of tiles for the screen
  config.TILE_AREA = {};
  config.TILE_AREA.x = Math.ceil(config.SCREEN.x / config.TILE.x) * 2 + BUFFER_TILES;
  config.TILE_AREA.y = Math.ceil(config.SCREEN.y / config.TILE.y) + BUFFER_TILES;

  // compute the origin of the visibleGroup
  config.ORIGIN = {};
  config.ORIGIN.x = BUFFER_TILES / 4 * config.TILE.x * -1;
  config.ORIGIN.y = BUFFER_TILES / 2 * config.TILE.y * -1;

  return {
    tileManager: tileManager,
    initialize: initialize
  };
};

exports.default = {
  configure: configure,
  util: {
    getTileById: function getTileById(id) {
      return Helpers.getTile(config.BOARD, config.TILE_AREA, tiles)(id);
    },
    vertexOfWhichTileByPoint: function vertexOfWhichTileByPoint(point, accuracy) {
      return Helpers.vertexOfWhichTileClicked(tiles, config.TILE, accuracy)(point);
    },
    whichTileByPoint: function whichTileByPoint(point) {
      return Helpers.whichTileClicked(tiles, config.TILE)(point);
    }
  }
};

/***/ })
/******/ ]);
});