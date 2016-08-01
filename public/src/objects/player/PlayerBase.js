import Tool from "../tool/Tool";

/**
 * A base class for controllable characters to extend.
 */
class PlayerBase extends Phaser.Sprite {
  constructor(game, x, y, sprite_sheet, frame, collision_layer) {
    super(game, x, y, sprite_sheet, frame);
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.addAnimations();
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.game.add.existing(this);

    // Controls.
    this.use_tool_key = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.use_tool_key.onDown.add(this.useTool, this);
    this.bindKeyboardListeners();

    // Default to facing south.
    this.setDirection("south");
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
    var directionKeys = {
        rightKeyPressed: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        leftKeyPressed: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        upKeyPressed: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
        downKeyPressed: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      },
      direction;

    // Bind main arrow keys.
    for (direction in directionKeys) {
      directionKeys[direction].onDown.add(this.movementKeyEvent, this);
      directionKeys[direction].onUp.add(this.movementKeyEvent, this);
    }

  }

  /**
   * Respond to a main arrow key being pressed or released.
   */
  movementKeyEvent() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = 0 - this._movement_speed;
      this.setDirection("west", true);

    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.y = 0;
      this.body.velocity.x = this._movement_speed;
      this.setDirection("east", true);

    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = this._movement_speed;
      this.setDirection("south", true);

    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0 - this._movement_speed;
      this.setDirection("north", true);

    } else {
      this.body.velocity.y = 0;
      this.body.velocity.x = 0;
      this._moving = false;
      this.animations.stop(null, true);
    }
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

  /**
   * Add animations for the player.
   */
  addAnimations() {
    // this.animations.add("walk_down", [0,1,2,3], 8, true);
    // this.animations.add("walk_up", [4,5,6,7], 8, true);
    // this.animations.add("walk_horizontal", [8,9,10,11], 8, true);
    // this.animations.add("hoe_north", [0,1,2,3], 7, true);
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

export default PlayerBase;
