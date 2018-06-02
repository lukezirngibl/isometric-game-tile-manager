## Isometric Game Tile Manager

#### Demo

[Check out the demo](https://lukezirngibl.github.io/isometric-game-tile-manager/examples/phaser-js/build/index.html)

#### How it works

In the diagrams below, the blue outline is the screen view and the blue arrows are the directions the screen is moving.
The green tiles are the tiles that are being rendered and stored in memory.

###### Vertical move

![alt text](https://lukezirngibl.github.io/isometric-game-tile-manager/assets/vertical-diagram.jpg "vertical")

As the player moves upward, top rows are added and bottom rows are removed.

###### Lateral move

![alt text](https://lukezirngibl.github.io/isometric-game-tile-manager/assets/lateral-diagram.jpg "lateral")

As the player moves right, right columns are added and left columns are removed.

#### Future work

- Handle window size changes
- Mini map where user can jump to locations
