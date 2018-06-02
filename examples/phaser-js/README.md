### Infinite Isometric Phaser.js map

A quick start to building a Phaser.js game with an arbitrarily large isometric map. As the player scrolls the map,
tiles will be added and removed asynchronously using a custom algorithm.

[Check out the demo](https://lukezirngibl.github.io/infinite-isometric-phaser-js-map/build/index.html)

#### Get started

Edit the src/constants.js file. Set your BOARD_WIDTH & BOARD_HEIGHT to whatever you wish. You may also set
GLOBAL_ORIGIN to the point where the player will start when the map is loaded.

```
yarn install or npm install
```
```
yarn run dev or npm run dev
```
```
navigate to http://localhost:3000 in your browser
```

#### How it works

In the diagrams below, the blue outline is the screen view and the blue arrows are the directions the screen is moving.
The green tiles are the tiles that are being rendered and stored in memory.

###### Vertical move

![alt text](https://lukezirngibl.github.io/infinite-isometric-phaser-js-map/assets/vertical-diagram.jpg "vertical")

As the player moves upward, top rows are added and bottom rows are removed.

###### Lateral move

![alt text](https://lukezirngibl.github.io/infinite-isometric-phaser-js-map/assets/lateral-diagram.jpg "lateral")

As the player moves right, right columns are added and left columns are removed.

#### Future work

- Handle window size changes
- Mini map where user can jump to locations
