import Preloader from "./states/load/Preloader";
import GameState from "./states/world/GameState";

// TODO:
// - Move sprites into texture atlas.

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add("Preloader", Preloader, false);
    this.state.add("GameState", GameState, false);
		this.state.start("Preloader");
	}

}

new Game();
