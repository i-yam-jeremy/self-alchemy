

const FONT_SIZE = 18;

class TextField {

	static loadAssets(phaser) {
		phaser.load.image('text-field-cap', 'assets/game-frame/text-field/cap.png');
		phaser.load.image('text-field-center', 'assets/game-frame/text-field/center.png');
	}

	constructor(phaser, width, x, y) {
		this.x = 0;
		this.y = 0;
		let sprites = [];
		
		let leftCap = phaser.add.image(0, 0, 'text-field-cap').setOrigin(0, 0);
		sprites.push(leftCap);
		let rightCap = phaser.add.image(width, 0, 'text-field-cap').setOrigin(0, 0);
		rightCap.setScale(-1, 1);
		sprites.push(rightCap);

		for (let x = 0; x < width - 2*leftCap.width; x++) {
			let centerSprite = phaser.add.image(leftCap.width+x, 0, 'text-field-center').setOrigin(0, 0);
			sprites.push(centerSprite);
		}

		this._textSprite = phaser.add.text(leftCap.width, (32-FONT_SIZE)/2, "Hello world", {
			fontSize: FONT_SIZE + 'px',
			fontFamily: 'Courier',
			color: '#8e7c62',
		});
		sprites.push(this._textSprite);

		this._spriteGroup = phaser.add.group(sprites);

		this.setPosition(x, y);
	}

	setPosition(x, y) {
		x = x || this.x;
		y = y || this.y;
		let dx = x - this.x;
		let dy = y - this.y;
	
	
		for (let sprite of this._spriteGroup.children.getArray()) {
			sprite.setPosition(sprite.x+dx, sprite.y+dy);
		}

		this.x = x;
		this.y = y;
	}

}

export { TextField };
