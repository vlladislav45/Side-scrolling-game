import Character from "./character";
import InputHandler from "./input";
import Score from "./score.js";
import Bomb from "./bomb";
import Obstacle from "./obstacle"
import Sound from "./sound";
import Enemy from "./enemy";
import Pause from "./pause";
import Gameover from "./gameover";
import Button from "./common/button";
import Message from "./common/message";

//Global variables
let app, gameOver, mainScene, restartBtn, restartText = null;
let scores = 0;
const GAME_WIDTH = 1366;
const GAME_HEIGHT = 768;
function createGame() {
      app = new PIXI.Application({ 
        width: GAME_WIDTH, 
        height: GAME_HEIGHT        
      }
    );
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view); //Canvas
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.width = window.innerWidth + "px";
    app.renderer.view.style.height = window.innerHeight + "px";
    app.renderer.view.style.display = "block";
    app.renderer.view.style.border = "8px solid black";

  const obstacleFrames = [ 
    "../sprites/obstacles/coin-0.png",
    "../sprites/obstacles/coin-1.png",
    "../sprites/obstacles/coin-2.png",
    "../sprites/obstacles/coin-3.png",
    "../sprites/obstacles/coin-4.png",
    "../sprites/obstacles/coin-5.png",
    "../sprites/obstacles/coin-6.png",
    "../sprites/obstacles/coin-7.png",
    "../sprites/obstacles/coin-8.png",
    "../sprites/obstacles/coin-9.png",
    "../sprites/obstacles/coin-10.png",
    "../sprites/obstacles/coin-11.png",
    "../sprites/obstacles/coin-12.png",
    "../sprites/obstacles/coin-13.png",
    "../sprites/obstacles/coin-14.png"
  ];

  const crashPlane = [
    "../sprites/crash_plane/explosion-01.png",
    "../sprites/crash_plane/explosion-02.png",
    "../sprites/crash_plane/explosion-03.png",
    "../sprites/crash_plane/explosion-04.png",
    "../sprites/crash_plane/explosion-05.png",
    "../sprites/crash_plane/explosion-06.png",
    "../sprites/crash_plane/explosion-07.png",
    "../sprites/crash_plane/explosion-08.png",
    "../sprites/crash_plane/explosion-09.png"
  ];

  const tank = [
    "../sprites/tank/left-1.png",
    "../sprites/tank/left-2.png",
    "../sprites/tank/left-3.png",
    "../sprites/tank/left-4.png",
  ];

  app.loader.baseUrl = "assets";
  app.loader
    .add("bgBack", "mountains/bgBack_mountain.png")
    .add("bgMiddle", "mountains/bgMid_mountain.png")
    .add("bgFront", "mountains/bgFront_mountain.png")
    .add("bgClouds", "mid_ground_cloud_1.png")
    .add("bgMidClouds", "mid_ground_cloud_2.png")
    .add("bgSky", "sky_color.png")
    .add("bgSkyTop", "sky_color_top.png")
    .add("bgSun", "sun.png")
    .add("character", "../sprites/plane.png")
    .add(obstacleFrames)
    .add(crashPlane)
    .add("soundOn", "../images/icons8-sound-100.png")
    .add("soundOff", "../images/icons8-sound-speaker-100.png")
    .add(tank)
    .add("bullet", "../sprites/bullet/1.png")
    .add("pause", "../images/icons8-pause-100.png")
    .add("restartBtn", "../images/restart-btn.png")
    .load(setup);

    let bgBack, bgMiddle, bgFront, bgClouds, bgMidClouds, bgSky, bgSkyTop, bgSun;
    let bgX = 0;
    let bgSpeed = 2;

    //This `setup` function will run when the image has loaded
  function setup() {
      mainScene = new PIXI.Container();
      mainScene.visible = true;
      app.stage.addChild(mainScene);

      //Init game over scene
      gameOver = new Gameover(app, GAME_WIDTH, GAME_HEIGHT);

      //Init restart button 
      restartBtn = new Button(app.loader.resources["restartBtn"].texture, GAME_WIDTH / 2, GAME_HEIGHT / 2,);
      restartText = new Message("Restart");
      restartBtn.addText(restartText.text);

      gameOver.add(restartBtn.element);

      bgSun = createBackground(app.loader.resources["bgSun"].texture, GAME_WIDTH, GAME_HEIGHT,GAME_WIDTH - 50, GAME_HEIGHT / 100);
      bgSkyTop = createBackground(app.loader.resources["bgSkyTop"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 100);
      bgSky = createBackground(app.loader.resources["bgSky"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 6.3);
      bgClouds = createBackground(app.loader.resources["bgClouds"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 10);
      bgMidClouds = createBackground(app.loader.resources["bgMidClouds"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 5);
      bgBack = createBackground(app.loader.resources["bgBack"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 400);
      bgMiddle = createBackground(app.loader.resources["bgMiddle"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 180);
      bgFront = createBackground(app.loader.resources["bgFront"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 100);

      //Create the character (plane) and other objects
      const character = new Character(app, GAME_WIDTH,GAME_HEIGHT, app.loader.resources["character"].texture, mainScene, app.loader.resources["bullet"].texture); 
      new InputHandler(character);
      let score = new Score(app,GAME_WIDTH,GAME_HEIGHT);
      scores = 0;
      mainScene.addChild(score.scoreText);
      let finalScores = new Score(app,GAME_WIDTH, GAME_HEIGHT);
      gameOver.add(finalScores.scoreText);
      let bomb = new Bomb(app,GAME_WIDTH,GAME_HEIGHT, mainScene);
      const localSound = "./sounds/airplanes.wav";
      const sound = new Sound(app, localSound, GAME_WIDTH, GAME_HEIGHT, app.loader.resources["soundOn"].texture,
      app.loader.resources["soundOff"].texture, mainScene);
      const pause = new Pause(app, app.loader.resources["pause"].texture,GAME_WIDTH, GAME_HEIGHT, mainScene);      

      //Create obstacles
      const lengthOfObstacles = 7;
      let obstacles = [];
      for(let i = 0; i < lengthOfObstacles; i++) {
          obstacles.push(new Obstacle(app, GAME_WIDTH, GAME_HEIGHT, obstacleFrames, mainScene));
      }

      //Create Enemies (Tanks)
      let enemies = [];
      const lengthOfEnemies = 3;
      for(let i = 0; i < lengthOfEnemies; i++) {
        enemies.push(new Enemy(app, GAME_WIDTH, GAME_HEIGHT, tank, app.loader.resources["bullet"].texture, character, mainScene));
      }

      app.ticker.add(function(delta) {
        updateBackground(); // Scroll sider background

        character.update(); // Character update
        character.draw(); // Character draw

         sound.check(); // Sound mute/unmuted
         pause.check(); // Pause canvas/resume canvas
        
        for(let i = 0; i < obstacles.length; i++) { // Obstacles
            obstacles[i].update();
            obstacles[i].draw();
            
            if(collision(character.character,obstacles[i].obstacleFrames)) {
              character.crash(crashPlane);
              obstacles[i].stop(true);

              endGame();
            }else {
              if(character.score(obstacles[i])) {
                scores += 57;
                score.update(scores); 
                finalScores.update(scores);
              }
            }

            if(collision(character.bulletBody,obstacles[i].obstacleFrames)) {
              character.stopShot();
              obstacles[i].respawn();
           }
        }

        for(let i = 0; i < enemies.length; i++) { // Tanks
          enemies[i].update();
          enemies[i].draw();        

          bomb.updateBombText(enemies[i].missedBombs);

          if(collision(character.character,enemies[i].enemy) || collision(character.character,enemies[i].bullet)) {
            character.crash(crashPlane);

            endGame();
          }
          
          if(collision(character.bulletBody,enemies[i].enemy)) {
             character.stopShot();
             enemies[i].respawn();
          }

      }    
      });
  }

  function createBackground(texture, game_width, game_height, x, y) {
    let tiling = new PIXI.TilingSprite(texture, game_width, game_height);
    tiling.position.set(x,y);
    mainScene.addChild(tiling);

    return tiling;
  }

  function updateBackground() {
    bgX -= bgSpeed;
    bgFront.tilePosition.x = bgX;
    bgMiddle.tilePosition.x = bgX / 2;
    bgBack.tilePosition.x = bgX / 4;
    bgClouds.tilePosition.x = bgX / 2;
    bgMidClouds.tilePosition.x = bgX / 4;
  }

  function collision(character,enemy) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
    
    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    character.centerX = character.x + character.width / 2; 
    character.centerY = character.y + character.height / 2; 
    enemy.centerX = enemy.x + enemy.width / 2; 
    enemy.centerY = enemy.y + enemy.height / 2; 

    //Find the half-widths and half-heights of each sprite
    character.halfWidth = character.width / 2;
    character.halfHeight = character.height / 2;
    enemy.halfWidth = enemy.width / 2;
    enemy.halfHeight = enemy.height / 2;

    //Calculate the distance vector between the sprites
    vx = character.centerX - enemy.centerX;
    vy = character.centerY - enemy.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = character.halfWidth + enemy.halfWidth;
    combinedHalfHeights = character.halfHeight + enemy.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }
    //`hit` will be either `true` or `false`
    return hit;
  }
}
createGame();

function endGame() {
  setTimeout(() =>{
    mainScene.visible = false;
    gameOver.visible(true);

      restartBtn.element.mouseover = () => {
        restartBtn.element.alpha = 0.5;
      }

      restartBtn.element.mouseout = () => {
        restartBtn.element.alpha = 1;
      }
    
    restartBtn.element.on("mousedown", () => {
      resetGame();
    });
    
  }, 1000);

}

function resetGame() {
  setTimeout(() => {
    while(app.stage.children[0]) { 
      app.stage.removeChild(app.stage.children[0]); 
    }
    app.stage.destroy(true);
    document.body.removeChild(app.view);
    setTimeout(createGame, 3000);
  }, 3000);
}

