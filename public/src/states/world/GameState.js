import Player from "../../objects/player/Player";

class GameState extends Phaser.State {

  create() {
    var map, walkable_layer, collision_layer, above_layer, player, walkables;

    map = this.game.add.tilemap("dev_map");
    map.addTilesetImage("Dev Tiles", "tiles", 16, 16);
    walkable_layer = map.createLayer("Ground");
    walkable_layer.resizeWorld();
    collision_layer = map.createLayer("Collision");

    player = new Player(this.game, 20, 20, "main_char", 0, collision_layer);
    collision_layer.resizeWorld();
    above_layer = map.createLayer("Above");

    map.setCollision([
      101, 102, 103, 104,
      121, 122, 123, 124,
      141, 142, 143, 144,
      161, 162, 163, 164,
      155, 195, 46, 47, 48, 49, 50, 51,
      66, 67, 68, 69, 70, 71,
      86, 87, 88, 89, 90, 91
    ], true, collision_layer, true);
  }

}

export default GameState;
