export default class Button {
    constructor(texture, offsetX, offsetY) {
      this.element = new PIXI.Sprite(texture);
      this.element.position.set(offsetX, offsetY);
      this.element.anchor.set(0.5,0.5);
      this.element.interactive = true;
      this.element.buttonMode = true;
    }

    addText(text) {
        this.element.addChild(text);
    }
}