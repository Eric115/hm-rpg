import PlayerBase from "./PlayerBase";
import Hoe from "../tool/Hoe";

class MainPlayer extends PlayerBase {
  constructor(game, x, y, sprite_sheet, frame, collision_layer) {
    // Set sprite size.
    this.body.setSize(13, 12, 1, 6);
    this.game.camera.follow(this);

    // Call parent constructor.1
    super(game, x, y, sprite_sheet, frame);

    // Define instance vars.
    this._collision_layer = collision_layer;
    this._movement_speed = 60;
    this._moving = false;
    this._equipped_tool = null;

    this.equipped_tool = new Hoe(1, 10);
  }

  addAnimations() {
    this.animations.add("walk_down", [0,1,2,3], 8, true);
    this.animations.add("walk_up", [4,5,6,7], 8, true);
    this.animations.add("walk_horizontal", [8,9,10,11], 8, true);
    this.animations.add("hoe_north", [0,1,2,3], 7, true);
  }
}

export default MainPlayer;