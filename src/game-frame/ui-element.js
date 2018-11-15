
class UIElement {

	constructor(components) {
		this.sprites = new components.sprites();
		this.keyboardHandler = new components.keyboardHandler(this.sprites);
		this.pointerHandler = new components.pointerHandler(this.sprites);
	}

}

export { UIElement };
