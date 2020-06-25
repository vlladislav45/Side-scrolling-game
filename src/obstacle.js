import { speed } from "./utils/speed";

export default class Obstacle {
    constructor(app, GAME_WIDTH, GAME_HEIGHT, animatedTexture, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.scene = scene;

        this.position = {
            x: this.GAME_WIDTH,
            y: this.randomSpawn(Math.random() * GAME_HEIGHT)
        }

        this.obstacleFrames = new PIXI.AnimatedSprite.fromFrames(animatedTexture);
        this.obstacleFrames.position.set(this.position.x,this.position.y);
        this.obstacleFrames.width = 60;
        this.obstacleFrames.height = 60;
        this.obstacleFrames.animationSpeed = 0.150; 
        this.obstacleFrames.play();

        scene.addChild(this.obstacleFrames);      

        this.minSpeed = 3;
        this.maxSpeed = 10;
        this.currentSpeed = speed(this.minSpeed, this.maxSpeed);

        this.isStopped = false;
    }

    randomSpawn(number) {
        const tanksY = 450;

        if(number < tanksY) {
            return number;
        }
        return Math.floor((Math.random() * 450) + 1 );
    }

    respawn() {
        this.position.x = this.GAME_WIDTH;
        this.position.y = this.randomSpawn(Math.random() * this.GAME_HEIGHT);

        this.currentSpeed = speed(this.minSpeed, this.maxSpeed);
    }

    stop(param) {
        this.isStopped = param;
    }

    draw() {
        this.obstacleFrames.position.set(this.position.x,this.position.y);
    }

    update() {
        //this.isStopped === true ? this.currentSpeed = 0 : this.position.x -= this.currentSpeed;
        if(this.isStopped === true) this.currentSpeed = 0;
        else this.position.x -= this.currentSpeed;

        if(this.position.x <= 0) {
            this.position.x = this.GAME_WIDTH;
            this.position.y = this.randomSpawn(Math.random() * this.GAME_HEIGHT);

            this.currentSpeed = speed(this.minSpeed, this.maxSpeed);
        }
    }
}