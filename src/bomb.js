export default class Bomb {
    constructor(app, GAME_WIDTH, GAME_HEIGHT, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.scene = scene;

        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "black",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowDistance: 3,
          });

        this.bombText = new PIXI.Text("Bombs: ", this.style);
        this.bombText.position.set(this.GAME_WIDTH / 100, this.GAME_HEIGHT / 20);
        scene.addChild(this.bombText);
    }

    updateBombText(bombText) {
        this.bombText.text = "Bombs: " + bombText;
    }
}