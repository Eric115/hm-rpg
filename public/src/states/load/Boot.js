/**
 * Load sprites for loading screen and start preloader.
 */
class Boot extends Phaser.State {
  preload() {
    this.load.image("preloadBar", "assets/loader.png");
  }

  create() {
    this.game.state.start("Preloader", true, false);
  }

}

export default Boot;
