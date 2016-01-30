
class Npc extends Phaser.Sprite {
  constructor(game, x, y, sprite_sheet, frame, collision_layer) {
    super(game, x, y, sprite_sheet, frame);
    this.game = game;
    this._movement_speed = 80;
    this.anchor.setTo(0.5, 0.5);
    this.addAnimations();

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    //this.body.setSize(13, 12, 1, 6);
    this.game.add.existing(this);
  }

  addAnimations() {

  }
}

export default Npc;
