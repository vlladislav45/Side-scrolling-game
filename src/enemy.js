export default class Enemy {
    constructor(app,GAME_WIDTH, GAME_HEIGHT,animatedTexture, bulletTexture, character, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.animatedTexture = animatedTexture;
        this.character = character;
        this.scene = scene;

        this.position = {
            x: this.GAME_WIDTH - Math.floor((Math.random() * 10) + 1),
            y: this.GAME_HEIGHT - 100
        }

        this.enemy = new PIXI.AnimatedSprite.fromFrames(animatedTexture);
        this.enemy.position.set(this.position.x,this.position.y);
        this.enemy.width = 100;
        this.enemy.height = 80;
        this.enemy.animationSpeed = 0.150; 
        this.enemy.play();
        scene.addChild(this.enemy);      

        this.maxSpeed = this.randomSpeedVX();

        //Bullet
        this.bullet = new PIXI.Sprite(bulletTexture);
        this.bullet.width = 30;
        this.bullet.height = 15;
        this.bullet.position.set(this.enemy.position.x + 10, this.enemy.position.y + 10);
        scene.addChild(this.bullet);
        this.bulletSpeed = 7;

        this.missedBombs = 0;
    }

    randomSpeedVX() {
        let randomSpeed = Math.floor((Math.random() * 4) + 1);
        return randomSpeed;
    }

    shot() {
        this.bullet.rotation = 1;
        this.bullet.x -= this.bulletSpeed;
        this.bullet.y -= this.bulletSpeed;

        if(this.bullet.x + this.bullet.width <= 0 || this.bullet.y + this.bullet.height <= 0) {
            this.bullet.x = this.enemy.x;
            this.bullet.y = this.enemy.y;

            this.missedBombs++;
        }
    }

    draw() {
        this.enemy.position.set(this.position.x,this.position.y);
    }

    update() {
        this.position.x -= this.maxSpeed;       

        if(this.position.x <= 0) {
            this.position.x = this.GAME_WIDTH - Math.floor((Math.random() * 10) + 1);
            this.position.y = this.GAME_HEIGHT - 100;

            this.maxSpeed = this.randomSpeedVX();
        }

        this.shot();
    }
}