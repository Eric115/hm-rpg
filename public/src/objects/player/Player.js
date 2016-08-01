import Tool from "../tool/Tool";
import Hoe from "../tool/Hoe";

class Player extends Phaser.Sprite {
  constructor(game, x, y, sprite_sheet, frame, collision_layer) {
    super(game, x, y, sprite_sheet, frame);
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.addAnimations();
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.setSize(13, 12, 1, 6);
    this.game.camera.follow(this);
    this.game.add.existing(this);

    // Controls.
    this.use_tool_key = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.use_tool_key.onDown.add(this.useTool, this);

    // Define instance vars.
    this._collision_layer = collision_layer;
    this._movement_speed = 60;
    this._moving = false;
    this._equipped_tool = null;

    this.bindKeyboardListeners();

    // Default to facing south.
    this.setDirection("south");

    this.equipped_tool = new Hoe(1, 10);
  }

  /**
   * Update collision layer.
   *
   * @param layer
   *   The collision layer.
   */
  set collisionLayer(layer) {
    this._collision_layer = layer;
  }

  /**
   * Update movement speed.
   *
   * @param speed
   *   Speed to move at. Normal speed is 60.
   */
  set movementSpeed(speed) {
    this._movement_speed = speed;
  }

  /**
   * Set the equipped tool.
   *
   * @param tool Tool|null
   *   Set the equipped tool or de-equip all with null.
   *   Tools must be an instance of Tool.
   */
  set equipped_tool(tool) {
    if (tool === null || (tool instanceof Tool)) {
      this._equipped_tool = tool;
    }
  }

  /**
   * Bind keyboard press listeners.
   */
  bindKeyboardListeners() {
    var rightKeyPressed = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      leftKeyPressed = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      upKeyPressed = this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      downKeyPressed = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    rightKeyPressed.onDown.add(function() {
      if (!this._moving) {
        this.body.velocity.x = this._movement_speed;
        this._moving = true;
        this.setDirection("east", true);
      }
    }, this);

    rightKeyPressed.onUp.add(function() {
      this.body.velocity.x = 0;
      this._moving = false;
      this.animations.stop(null, true);
    }, this);

    leftKeyPressed.onDown.add(function() {
      if (!this._moving) {
        this.body.velocity.x = 0 - this._movement_speed;
        this._moving = true;
        this.setDirection("west", true);
      }
    }, this);

    leftKeyPressed.onUp.add(function() {
      this.body.velocity.x = 0;
      this._moving = false;
      this.animations.stop(null, true);
    }, this);

    upKeyPressed.onDown.add(function() {
      if (!this._moving) {
        this.body.velocity.y = 0 - this._movement_speed;
        this._moving = true;
        this.setDirection("north", true);
      }
    }, this);

    upKeyPressed.onUp.add(function() {
      this.body.velocity.y = 0;
      this._moving = false;
      this.animations.stop(null, true);
    }, this);


    downKeyPressed.onDown.add(function() {
      if (!this._moving) {
        this.body.velocity.y = this._movement_speed;
        this._moving = true;
        this.setDirection("south", true);
      }
    }, this);

    downKeyPressed.onUp.add(function() {
      this.body.velocity.y = 0;
      this._moving = false;
      this.animations.stop(null, true);
    }, this);

  }

  /**
   * Set the direction the sprite is facing.
   *
   * @param direction string
   *   north, east, south or west.
   *
   * @param play bool
   *   Play animation after changing direction.
   */
  setDirection(direction, play) {
    switch (direction) {
      case "north": {
        this._direction = "north";
        this.animations.play("walk_up");
        break;
      }

      case "east": {
        this._direction = "east";
        this.animations.play("walk_horizontal");

        if (this.scale.x  === -1) {
          this.scale.x = 1;
        }
        break;
      }

      case "south": {
        this._direction = "south";
        this.animations.play("walk_down");
        break;
      }

      case "west": {
        this._direction = "west";
        this.animations.play("walk_horizontal");

        if (this.scale.x  === 1) {
          this.scale.x = -1;
        }
        break;
      }
    }

    if (!play) {
      this.animations.stop();
    }
  }

  addAnimations() {
    this.animations.add("walk_down", [0,1,2,3], 8, true);
    this.animations.add("walk_up", [4,5,6,7], 8, true);
    this.animations.add("walk_horizontal", [8,9,10,11], 8, true);
    this.animations.add("hoe_north", [0,1,2,3], 7, true);
  }

  /**
   * Use the currently equipped tool on the square in front of player.
   */
  useTool() {
    if (this._equipped_tool === null) {
      return;
    }

    var animation;

    if (this._direction === "west" && this._equipped_tool.animations["west"] === undefined) {
      animation = this._equipped_tool.animations["east"];

      if (this.scale.x  === 1) {
        this.scale.x = -1;
      }
    } else {
      animation = this._equipped_tool.animations[this._direction];
    }

    this.animations.play(animation);
  }

  update() {
    this.game.physics.arcade.collide(this, this._collision_layer);
  }
}

export default Player;
