
const EVENT_TYPES = ['keyup', 'keydown', 'pointerup', 'pointerdown', 'pointerenter', 'pointerexit'];

function contains(bounds, p) {
	return  p.x > bounds.x &&
		p.y > bounds.y &&
		p.x < bounds.x + bounds.width &&
		p.y < bounds.y + bounds.height;
}

class UIElement {

	constructor(game, components, data, x, y) {
		this._x = 0;
		this._y = 0;
		this._sprites = new components.sprites(this, game, data);
		this.setPosition(x, y);
		this._keyboardHandler = new components.keyboardHandler(this, game, data);
		this._pointerHandler = new components.pointerHandler(this, game, data);

		this._pointerDown = false;
		this._pointerHovered = false;
		
		this._eventCallbacks = {};
		for (let eventType of EVENT_TYPES) {
			this._eventCallbacks[eventType] = [];
		}

		game.input.keyboard.on('keydown', (key) => {
			this._keyboardHandler.down(key);
		});

		game.input.keyboard.on('keydown', (key) => {
			this._keyboardHandler.up(key);
		});

		game.input.on('pointerdown', (p) => {
			if (contains(this._sprites.getBounds(), p)) {
				this._pointerDown = true;
				this._updateTint();
				this._eventCallbacks['pointerdown'].forEach(callback => callback());
			}
		});

		game.input.on('pointermove', (p) => {
			if (contains(this._sprites.getBounds(), p)) {
				if (!this._pointerHovered) {
					this._pointerHovered = true;
					this._updateTint();
					this._eventCallbacks['pointerenter'].forEach(callback => callback());
				}
			}
			else {
				if (this._pointerHovered) {
					this._pointerHovered = false;
					this._updateTint();
					this._eventCallbacks['pointerexit'].forEach(callback => callback());
				}
			}
		});

		game.input.on('pointerup', (p) => {
			if (this._pointerDown) {
				this._pointerDown = false;
				this._updateTint();
				this._eventCallbacks['pointerup'].forEach(callback => callback());
			}	
		});
	}

	simulateClick() {
		this._pointerDown = true;
		this._updateTint();
		this._eventCallbacks['pointerdown'].forEach(callback => callback());

		setTimeout(() => {
			this._pointerDown = false;
			this._updateTint();
			this._eventCallbacks['pointerup'].forEach(callback => callback());
		}, 200);
	
	}

	setPosition(x, y) {
		x = x || this._x;
		y = y || this._y;
		
		let dx = x - this._x;
		let dy = y - this._y;

		for (let sprite of this._sprites.getSprites()) {
			sprite.setPosition(sprite.x+dx, sprite.y+dy);
		}
	}

	_setTint(tint) {
		this._sprites.getSprites().forEach(sprite => sprite.setTint(tint));
	}

	_updateTint() {
		if (this._pointerDown) {
			this._setTint(0xAAAAAA);
		}
		else if (this._pointerHovered) {
			this._setTint(0xCCCCCC);
		}
		else {
			this._setTint(0xFFFFFF);
		}	
	}

	on(eventType, callback) {
		if (eventType in this._eventCallbacks) {
			this._eventCallbacks[eventType].push(callback);
		}
		else {
			throw 'Invalid event type for UIElement: ' + eventType;
		}
	}

}

/*
	SpriteSet must implement getSprites() and getBounds()
*/

/*
	KeyboardHandler must implement down(key) and up(key)
*/

/*
	PointerHandler must implement down(p), up(p), enter(p), and exit(p)
*/

/*new UIElement({
	sprites: ButtonSpriteSet,
	keyboardHandler: ButtonKeyboardHandler,
	pointerHandler: ButtonPointerHandler,
});*/

export { UIElement };
