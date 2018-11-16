import 'phaser';

import {button} from './game-frame/button';
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
	this.load.spritesheet('ether-blob', 'assets/matter-blobs/ether-blob.png', {frameWidth: 64, frameHeight: 64});
	TextField.loadAssets(this);
}

function create() {

	let etherBlob = this.add.sprite(400, 300, 'ether-blob');

	this.anims.create({
		key: 'ether-blob-squish',
		frames: this.anims.generateFrameNumbers('ether-blob', {start: 0, end: 12}),
		frameRate: 12,
		repeat: -1
	});

	etherBlob.anims.play('ether-blob-squish', true);

	let waterButton = button(this, 'transmute-button-water', 'a', 800-64*4, 600-64);
	waterButton.on('pointerdown', () => {
		console.log('Water');
	});
	let earthButton = button(this, 'transmute-button-earth', 's', 800-64*3, 600-64);
	earthButton.on('pointerdown', () => {
		console.log('Earth');
	});
	let fireButton = button(this, 'transmute-button-fire', 'd', 800-64*2, 600-64);
	fireButton.on('pointerdown', () => {
		console.log('Fire');
	});
	let etherButton = button(this, 'transmute-button-ether', 'f', 800-64*1, 600-64);
	etherButton.on('pointerdown', () => {
		console.log('Ether');
	});

	let textField = new TextField(this, 200, 100, 100);
}
