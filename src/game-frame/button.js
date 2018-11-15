import {UIElement} from './ui-element';

class ButtonSpriteSet {
	constructor(element, game, data) {
		let buttonSprite = game.add.image(0, 0, data.spriteName).setOrigin(0, 0);
		this._sprites = [buttonSprite];
	}

	getSprites() {
		return this._sprites;
	}

	getBounds() {
		let buttonSprite = this._sprites[0];
		return {
			x: buttonSprite.x,
			y: buttonSprite.y,
			width: buttonSprite.width,
			height: buttonSprite.height
		};
	}
}

class ButtonKeyboardHandler {
	
	constructor(element, game, data) {
		this._keyBinding = data.keyBinding;
		this._element = element;
	}

	down(key) {
		let keyValue;
		if (typeof this._keyBinding == 'string') {
			keyValue = key.key;
		}
		else {
			key.keyCode;
		}

		if (keyValue == this._keyBinding) {
			this._element.simulateClick();
		}
	}

	up(key) {

	}

	//TODO
}

class EmptyPointerHandler {
	constructor(element, game, data) {}
	down(p) {}
	up(p) {}
	enter(p) {}
	exit(p) {}
}


function button(game, spriteName, keyBinding, x, y) {
	return new UIElement(game, {
		sprites: ButtonSpriteSet,
		keyboardHandler: ButtonKeyboardHandler,
		pointerHandler: EmptyPointerHandler
	}, {
		spriteName: spriteName,
		keyBinding: keyBinding
	}, x, y);
}

export { button };

/*class Button {

	constructor(game, spriteName, x, y) {
		this._sprite = game.add.image(x, y, spriteName);
		this.eventCallbacks = {
			'down': []
		};
		this._isPointerDown = false;
		this._isPointerHovered = false;
		this._sprite.setInteractive();
		this._sprite.on('pointerdown', (p) => {
			this._isPointerDown = true;
			this._updateTint();
			this.eventCallbacks['down'].forEach(f => f());
		});
		game.input.on('pointermove', (p) => {
			if (p.x > this._sprite.x - this._sprite.width/2 &&
			    p.x < this._sprite.x + this._sprite.width/2 &&
			    p.y > this._sprite.y - this._sprite.height/2 &&
			    p.y < this._sprite.y + this._sprite.height/2) {

				this._isPointerHovered = true;
				this._updateTint();
			}
			else {
				this._isPointerHovered = false;
				this._updateTint();
			}
		});
		game.input.on('pointerup', (p) => {
			this._isPointerDown = false;
			this._updateTint();
		});
	}

	_updateTint() {
		if (this._isPointerDown) {
			this._sprite.setTint(0xAAAAAA);
		}
		else if (this._isPointerHovered) {
			this._sprite.setTint(0xCCCCCC);
		}
		else {
			this._sprite.setTint(0xFFFFFF);
		}
	}

	on(eventType, callback) {
		if (eventType in this.eventCallbacks) {
			this.eventCallbacks[eventType].push(callback);
		}
		else {
			throw 'Invalid event type ' + eventType;
		}
	}

}*/
