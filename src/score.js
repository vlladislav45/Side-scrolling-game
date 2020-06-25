export default class Score {
    constructor(app, GAME_WIDTH, GAME_HEIGHT) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;

        this.style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "black",
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowDistance: 3,
          });
          
        this.scoreText = new PIXI.Text("Scores: " + 0, this.style);
        this.scoreText.position.set(this.GAME_WIDTH / 100, this.GAME_HEIGHT / 100);
        //scene.addChild(this.scoreText);
    }

    updateScoreText(scoreText, isStopped) {
        if(isStopped === false) this.scoreText.text = "Scores: " + scoreText;
        else return this.scoreText.text;
    }

}