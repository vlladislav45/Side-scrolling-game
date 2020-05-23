import Character from "./character.js";
import InputHandler from "./input.js";
import Message from "./message.js";
import Obstacle from "./obstacle.js"
import Sound from "./sound.js";
import Enemy from "./enemy.js";
import Pause from "./pause.js";

//Create a Pixi Application
let app = null;
function createGame() {
  const GAME_WIDTH = 1366;
  const GAME_HEIGHT = 768;

      app = new PIXI.Application({ 
        width: GAME_WIDTH, 
        height: GAME_HEIGHT        
      }
    );
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
    // app.renderer.view.style.position = "absolute";
    app.renderer.view.style.width = window.innerWidth + "px";
    app.renderer.view.style.height = window.innerHeight + "px";
    // app.renderer.view.style.display = "block";
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
    .load(setup);

    let gameOverScene,message, bgBack, bgMiddle, bgFront, bgClouds, bgMidClouds, bgSky, bgSkyTop, bgSun;
    let bgX = 0;
    let bgSpeed = 2;

    //This `setup` function will run when the image has loaded
  function setup() {
      //Create the `gameOver` scene
      gameOverScene = new PIXI.Container;
      app.stage.addChild(gameOverScene);
    
      //Make the `gameOver` scene invisible when the game first starts
      gameOverScene.visible = false;
    
      //Create the text sprite and add it to the `gameOver` scene
      let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 40,
        fill: "white"
      });
      message = new PIXI.Text("The End!", style);
      message.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
      gameOverScene.addChild(message);

    bgSun = createBg(app.loader.resources["bgSun"].texture, GAME_WIDTH, GAME_HEIGHT,GAME_WIDTH - 50, GAME_HEIGHT / 100);
    bgSkyTop = createBg(app.loader.resources["bgSkyTop"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 100);
    bgSky = createBg(app.loader.resources["bgSky"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 6.3);
    bgClouds = createBg(app.loader.resources["bgClouds"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 10);
    bgMidClouds = createBg(app.loader.resources["bgMidClouds"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT / 5);
    bgBack = createBg(app.loader.resources["bgBack"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 400);
    bgMiddle = createBg(app.loader.resources["bgMiddle"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 180);
    bgFront = createBg(app.loader.resources["bgFront"].texture, GAME_WIDTH, GAME_HEIGHT,0, GAME_HEIGHT - 100);

    //Create the character (plane) and other objects
    let character = new Character(GAME_WIDTH,GAME_HEIGHT, app.loader.resources["character"].texture, app); 
    new InputHandler(character);
    let msg = new Message(app,GAME_WIDTH,GAME_HEIGHT, "Scores: 0", "Bombs: 0");
    let scores = 0;
    const localSound = "./sounds/airplanes.wav";
    const sound = new Sound(app, localSound, GAME_WIDTH, GAME_HEIGHT, app.loader.resources["soundOn"].texture, app.loader.resources["soundOff"].texture);
    const pause = new Pause(app, app.loader.resources["pause"].texture,GAME_WIDTH, GAME_HEIGHT);

    //Create obstacles
      //let lengthOfObstacles = Math.floor(Math.random() * 10) + 1;
      const lengthOfObstacles = 10;
      let obstacles = [];
      for(let i = 0; i < lengthOfObstacles; i++) {
          obstacles.push(new Obstacle(app, GAME_WIDTH, GAME_HEIGHT, obstacleFrames));
      }

    //Create Enemies (Tanks)
    let enemies = [];
    const lengthOfEnemies = 3;
    for(let i = 0; i < lengthOfEnemies; i++) {
      enemies.push(new Enemy(app, GAME_WIDTH, GAME_HEIGHT, tank, app.loader.resources["bullet"].texture, character));
    }

    app.ticker.add(function(delta) {
      updateBg(); // Scroll sider background

      character.update(); // Character update
      character.draw(); // Character draw

      sound.check(); // Sound mute/unmuted
      pause.check(); // Pause canvas/resume canvas
      
      for(let i = 0; i < obstacles.length; i++) { // Obstacles
          obstacles[i].update();
          obstacles[i].draw();

          if(character.score(obstacles[i])) {
             scores++;
             msg.updateScoreText("Scores: "+ scores);
          }
          

          if(collision(character.character,obstacles[i].obstacleFrames)) {
            character.crash(crashPlane);

            endGame();
            resetGame();
          }
      }

      for(let i = 0; i < enemies.length; i++) { // Tanks
        enemies[i].update();
        enemies[i].draw();        

        msg.updateBombText("Bombs: " + enemies[i].missedBombs);

        if(collision(character.character,enemies[i].enemy) || collision(character.character,enemies[i].bullet)) {
          character.crash(crashPlane);

          endGame();
          resetGame();
        }
    }
    
    });
  }

  function createBg(texture, game_width, game_height, x, y) {
    let tiling = new PIXI.TilingSprite(texture, game_width, game_height);
    tiling.position.set(x,y);
    app.stage.addChild(tiling);

    return tiling;
  }

  function updateBg() {
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

  function endGame() {
    app.stage.visible = false;
    gameOverScene.visible = true;
  }
}
createGame();

function resetGame() {
  //COMMENT: when the game is goin to reset in console we took a many errors, we have to fix them
  setTimeout(() => {
    document.body.removeChild(app.view);
    while(app.stage.children[0]) { 
      app.stage.removeChild(app.stage.children[0]); 
    }
    app.stage.destroy(true);
    setTimeout(createGame, 4000);
  }, 3000);
}

//app.loader.onError.add((error) => console.log(error));

