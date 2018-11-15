

const FONT_SIZE = 18;

class TextField {

	static loadAssets(game) {
		game.load.image('text-field-cap', 'assets/game-frame/text-field/cap.png');
		game.load.image('text-field-center', 'assets/game-frame/text-field/center.png');
	}

	constructor(game, width, x, y) {
		this._x = 0;
		this._y = 0;
		this._width = width;
		this._focused = false;

		let sprites = [];
		
		let leftCap = game.add.image(0, 0, 'text-field-cap').setOrigin(0, 0);
		sprites.push(leftCap);
		this._height = leftCap.height;
		let rightCap = game.add.image(width, 0, 'text-field-cap').setOrigin(0, 0);
		rightCap.setScale(-1, 1);
		sprites.push(rightCap);

		for (let x = 0; x < width - 2*leftCap.width; x++) {
			let centerSprite = game.add.image(leftCap.width+x, 0, 'text-field-center').setOrigin(0, 0);
			sprites.push(centerSprite);
		}

		this._textSprite = game.add.text(leftCap.width, (32-FONT_SIZE)/2, "Hello world", {
			fontSize: FONT_SIZE + 'px',
			fontFamily: 'Courier',
			color: '#8e7c62',
		});
		sprites.push(this._textSprite);

		this._spriteGroup = game.add.group(sprites);
		this._addEventListeners(game);
		this.setPosition(x, y);
	}

	_addEventListeners(game) {
		game.input.on('pointerdown', (p) => {
			if (p.x > this._x &&
			    p.x < this._x + this._width &&
			    p.y > this._y &&
			    p.y < this._y + this._height) {

				this._focus();
			}
			else {
				this._unfocus();
			}
		});
	}

	_focus() {
		if (!this._focused) {
			this._focused = true;
			this._updateTint();
		}
	}

	_unfocus() {
		if (this._focused) {
			this._focused = false;
			this._updateTint();
		}
	}

	_setTint(tint) {
		this._spriteGroup.children.getArray().forEach(sprite => sprite.setTint(tint));
	}

	_updateTint() {
		if (this._focused) {
			this._setTint(0xAAAAAA);
		}
		else if (this._isHovered) {
			this._setTint(0xCCCCCC);
		}
		else {
			this._setTint(0xFFFFFF);
		}
	}

	setPosition(x, y) {
		x = x || this._x;
		y = y || this._y;
		let dx = x - this._x;
		let dy = y - this._y;
	
	
		for (let sprite of this._spriteGroup.children.getArray()) {
			sprite.setPosition(sprite.x+dx, sprite.y+dy);
		}

		this._x = x;
		this._y = y;
	}

}

export { TextField };
