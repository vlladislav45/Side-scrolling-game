export default class Character {
    constructor(GAME_WIDTH, GAME_HEIGHT,texture,pixi) {
        this.app = pixi;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.texture = texture;

        this.character = new PIXI.Sprite(this.texture);

        this.width = 90;
        this.height = 80;

        this.position = {
            x: 200,
            y: 200
        }

        this.maxSpeed = 7;
        this.ySpeed = 0;

        this.scores = 0;
    }

    moveTop() {
        this.ySpeed = -this.maxSpeed;
    }

    moveDown() {
        this.ySpeed = +this.maxSpeed;
    }

    stop() {
        this.ySpeed = 0;
    }

    crash(animatedTexture) {
        this.character = new PIXI.AnimatedSprite.fromFrames(animatedTexture);
       this.character.animationSpeed = 0.150; 
        this.character.play();
        
        this.stop();
    }

    score(enemy) {
        if(this.position.x >= enemy.position.x) {
            return true;
        }
        return false;
    }

    draw() {
        this.character.position.set(this.position.x,this.position.y);
        this.character.width = this.width;
        this.character.height = this.height;
        this.app.stage.addChild(this.character);
    }

    update() {
        this.position.y += this.ySpeed;

        if (this.position.y <= 0) this.position.y = 0;

        if (this.position.y + this.height > this.GAME_HEIGHT) {
            this.position.y = this.GAME_HEIGHT - this.height;
        }
    }
}