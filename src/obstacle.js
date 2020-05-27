export default class Obstacle {
    constructor(app, GAME_WIDTH, GAME_HEIGHT, animatedTexture, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.scene = scene;

        this.position = {
            x: this.GAME_WIDTH,
            y: this.randomYV(Math.random() * GAME_HEIGHT)
        }

        this.obstacleFrames = new PIXI.AnimatedSprite.fromFrames(animatedTexture);
        this.obstacleFrames.position.set(this.position.x,this.position.y);
        this.obstacleFrames.width = 80;
        this.obstacleFrames.height = 80;
        this.obstacleFrames.animationSpeed = 0.150; 
        this.obstacleFrames.play();

        scene.addChild(this.obstacleFrames);      

        this.xSpeed = Math.floor((Math.random() * 10) + 1);
    }

    randomYV(number) {
        const tanksY = 500;

        if(number < tanksY) {
            return number;
        }
        return Math.floor((Math.random() * 500) + 1 );
    }

    draw() {
        this.obstacleFrames.position.set(this.position.x,this.position.y);
    }

    update() {
        this.position.x -= this.xSpeed;       

        if(this.position.x <= 0) {
            this.position.x = this.GAME_WIDTH;
            this.position.y = this.randomYV(Math.random() * this.GAME_HEIGHT);

            this.xSpeed = Math.floor((Math.random() * 7) + 1);
        }
    }
}