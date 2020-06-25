export default class Sound {
    constructor(app, src, GAME_WIDTH, GAME_HEIGHT, unmutedTexture, mutedTexture, scene) {
        this.app = app;
        this.GAME_WIDTH = GAME_WIDTH;
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.scene = scene;

        this.unmutedTexture = unmutedTexture;
        this.mutedTexture = mutedTexture;

        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);

        this.addTexture(mutedTexture);

        this.isMuted = false;
    }

    check() {
      this.btn.on('click', () => {
        if(!this.isMuted) {
          this.play();
          this.scene.removeChild(this.btn);
          this.addTexture(this.unmutedTexture);
          this.isMuted = true;
        }else {
          this.stop();
          this.scene.removeChild(this.btn);
          this.addTexture(this.mutedTexture);
          this.isMuted = false;
        }
      });
    }

    addTexture(texture) {
      this.btn = new PIXI.Sprite(texture);
      this.btn.interactive = true;
      this.btn.position.set(this.GAME_WIDTH / 100, this.GAME_HEIGHT / 8);
      this.btn.width = 50;
      this.btn.height = 50;
      this.btn.interactive = true;
      this.btn.buttonMode = true;
      this.scene.addChild(this.btn);
    }

    play(){
      this.sound.play();
    }

    stop(){
      this.sound.pause();
    }
}