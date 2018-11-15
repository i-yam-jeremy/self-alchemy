import 'phaser';

import {Button} from './game-frame/button';
import {TextField} from './game-frame/text-field';

var config = {
    type: Phaser.AUTO,
    parent: 'self-alchemy',
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
	this.load.image('transmute-button-earth', 'assets/game-frame/transmute-buttons/earth.png');
	this.load.image('transmute-button-fire', 'assets/game-frame/transmute-buttons/fire.png');
	this.load.image('transmute-button-ether', 'assets/game-frame/transmute-buttons/ether.png');
	TextField.loadAssets(this);
}

function create() {
	let waterButton = new Button(this, 'transmute-button-water', 800-32-64*3, 600-32);
	waterButton.on('down', () => {
		console.log('Water');
	});
	let earthButton = new Button(this, 'transmute-button-earth', 800-32-64*2, 600-32);
	earthButton.on('down', () => {
		console.log('Earth');
	});
	let fireButton = new Button(this, 'transmute-button-fire', 800-32-64*1, 600-32);
	fireButton.on('down', () => {
		console.log('Fire');
	});
	let etherButton = new Button(this, 'transmute-button-ether', 800-32, 600-32);
	etherButton.on('down', () => {
		console.log('Ether');
	});

	let textField = new TextField(this, 200, 100, 100);
}
