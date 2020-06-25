export default class Pause {
    constructor(app, texture, GAME_WIDTH, GAME_HEIGHT, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.scene = scene;

        this.addTexture(texture);

        this.isPause = false;
    }

    check() {
        this.btn.on('click', () => {
            if(!this.isPause) {
                this.pause();
                this.isPause = true;
            }else {
                this.resume();
                this.isPause = false;
            }
        });
    }

    pause() {
        this.app.stop();
    }

    resume() {
        this.app.start();
    }

    addTexture(texture) {
        this.btn = new PIXI.Sprite(texture);
        this.btn.interactive = true;
        this.btn.position.set(this.GAME_WIDTH / 20, this.GAME_HEIGHT / 8);
        this.btn.width = 50;
        this.btn.height = 50;
        this.btn.interactive = true;
        this.btn.buttonMode = true;
        this.scene.addChild(this.btn);
      }
}