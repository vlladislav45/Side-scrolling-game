export default class Message {
    constructor(app, GAME_WIDTH, GAME_HEIGHT, scoreText, bombText) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;

        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "black",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          });
          
        this.scores = new PIXI.Text(scoreText, this.style);
        this.bombs = new PIXI.Text(bombText, this.style);

        this.scores.position.set(this.GAME_WIDTH / 100, this.GAME_HEIGHT / 100);
        this.bombs.position.set(this.GAME_WIDTH / 100, this.GAME_HEIGHT / 20);

        this.app.stage.addChild(this.scores);
        this.app.stage.addChild(this.bombs);
    }

    updateScoreText(scoreText, bombText) {
        this.scores.text = scoreText;
    }

    updateBombText(bombText) {
        this.bombs.text = bombText;
    }
}