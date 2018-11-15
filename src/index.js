import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
	this.load.image('transmute-button-water', 'assets/game-frame/transmute-buttons/water.png');
}

function create() {
	var button = this.add.image(400, 150, 'transmute-button-water');
}
