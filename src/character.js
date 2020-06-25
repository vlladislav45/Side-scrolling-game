export default class Character {
    constructor(app,GAME_WIDTH, GAME_HEIGHT,texture, scene, bulletTexture) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.texture = texture;
        this.scene = scene;

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

        this.bulletBody = new PIXI.Sprite(bulletTexture);
        this.bulletBody.width = 50;
        this.bulletBody.height = 25;
        this.bulletBody.position.set(this.position.x + 100, this.position.y + 80);
        scene.addChild(this.bulletBody);
        this.bulletSpeed = 15;
    }

    shot() {
        this.bulletBody.rotation = 3.1;
        this.bulletBody.x += this.bulletSpeed;
        

        if(this.bulletBody.x + this.bulletBody.width >= this.GAME_WIDTH) {
            this.bulletBody.x = this.character.x + 100;
            this.bulletBody.y = this.character.y + 80;
        }
    }

    stopShot() {
        this.bulletBody.x = this.character.x + 100;
        this.bulletBody.y = this.character.y + 100;
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
        if(enemy.position.x <= 5) {
            return true;
        }
        return false;
    }

    draw() {
        this.character.position.set(this.position.x,this.position.y);
        this.character.width = this.width;
        this.character.height = this.height;
        this.scene.addChild(this.character);
    }

    update() {
        this.shot();

        this.position.y += this.ySpeed;

        if (this.position.y <= 0) this.position.y = 0;

        if (this.position.y + this.height > this.GAME_HEIGHT) {
            this.position.y = this.GAME_HEIGHT - this.height;
        }
    }
}