
class Button {

	constructor(phaser, spriteName, x, y) {
		this._sprite = phaser.add.image(x, y, spriteName);
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
		phaser.input.on('pointermove', (p) => {
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
		phaser.input.on('pointerup', (p) => {
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

}

export { Button };
