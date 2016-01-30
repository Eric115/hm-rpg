/**
 * Preload common game assets.
 */
class Preloader extends Phaser.State {
  preload() {
    // Load game assets.
    this.game.load.pack("core_sprites", "assets/assets.json");

    this.load.onLoadComplete.add(function() {
      this.game.state.start("GameState", true, false);
    }, this);
  }

}

export default Preloader;
