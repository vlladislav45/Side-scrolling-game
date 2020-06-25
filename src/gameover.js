export default class Gameover {
  constructor(app, GAME_WIDTH, GAME_HEIGHT) {
    this.container = new PIXI.Container();
    this.visible(false);

    app.stage.addChild(this.container);

    this.background = new PIXI.Graphics();
    this.background.beginFill(0x008E9B);
    this.background.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.add(this.background);
  }

  visible(visibility) {
      this.container.visible = visibility;
  }

  add(element) {
      this.container.addChild(element);
  }

}
