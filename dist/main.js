!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class i{constructor(t,e,s,i,a,o){this.app=t,this.GAME_WIDTH=e,this.GAME_HEIGHT=s,this.texture=i,this.scene=a,this.character=new PIXI.Sprite(this.texture),this.width=90,this.height=80,this.position={x:200,y:200},this.maxSpeed=7,this.ySpeed=0,this.scores=0,this.bulletBody=new PIXI.Sprite(o),this.bulletBody.width=50,this.bulletBody.height=25,this.bulletBody.position.set(this.position.x+100,this.position.y+80),a.addChild(this.bulletBody),this.bulletSpeed=15}shot(){this.bulletBody.rotation=3.1,this.bulletBody.x+=this.bulletSpeed,this.bulletBody.x+this.bulletBody.width>=this.GAME_WIDTH&&(this.bulletBody.x=this.character.x+100,this.bulletBody.y=this.character.y+80)}stopShot(){this.bulletBody.x=this.character.x+100,this.bulletBody.y=this.character.y+100}moveTop(){this.ySpeed=-this.maxSpeed}moveDown(){this.ySpeed=+this.maxSpeed}stop(){this.ySpeed=0}crash(t){this.character=new PIXI.AnimatedSprite.fromFrames(t),this.character.animationSpeed=.15,this.character.play(),this.stop()}score(t){return t.position.x<=5}draw(){this.character.position.set(this.position.x,this.position.y),this.character.width=this.width,this.character.height=this.height,this.scene.addChild(this.character)}update(){this.shot(),this.position.y+=this.ySpeed,this.position.y<=0&&(this.position.y=0),this.position.y+this.height>this.GAME_HEIGHT&&(this.position.y=this.GAME_HEIGHT-this.height)}}class a{constructor(t){document.addEventListener("keydown",e=>{switch(e.keyCode){case 38:t.moveTop();break;case 40:t.moveDown()}}),document.addEventListener("keyup",e=>{switch(e.keyCode){case 38:t.ySpeed<0&&t.stop();break;case 40:t.ySpeed>0&&t.stop()}})}}class o{constructor(t,e,s){this.app=t,this.GAME_WIDTH=e,this.GAME_HEIGHT=s,this.style=new PIXI.TextStyle({fontFamily:"Arial",fontSize:36,fill:"black",dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowDistance:3}),this.scoreText=new PIXI.Text("Scores: 0",this.style),this.scoreText.position.set(this.GAME_WIDTH/100,this.GAME_HEIGHT/100)}update(t){this.scoreText.text="Scores: "+t}}class n{constructor(t,e,s,i){this.app=t,this.GAME_WIDTH=e,this.GAME_HEIGHT=s,this.scene=i,this.style=new PIXI.TextStyle({fontFamily:"Arial",fontSize:36,fill:"black",dropShadow:!0,dropShadowColor:"#000000",dropShadowBlur:4,dropShadowDistance:3}),this.bombText=new PIXI.Text("Bombs: ",this.style),this.bombText.position.set(this.GAME_WIDTH/100,this.GAME_HEIGHT/20),i.addChild(this.bombText)}updateBombText(t){this.bombText.text="Bombs: "+t}}function h(t,e){return Math.floor(Math.random()*(e-t+1)+t)}class r{constructor(t,e,s,i,a){this.app=t,this.GAME_WIDTH=e,this.GAME_HEIGHT=s,this.scene=a,this.position={x:this.GAME_WIDTH,y:this.randomSpawn(Math.random()*s)},this.obstacleFrames=new PIXI.AnimatedSprite.fromFrames(i),this.obstacleFrames.position.set(this.position.x,this.position.y),this.obstacleFrames.width=60,this.obstacleFrames.height=60,this.obstacleFrames.animationSpeed=.15,this.obstacleFrames.play(),a.addChild(this.obstacleFrames),this.minSpeed=3,this.maxSpeed=10,this.currentSpeed=h(this.minSpeed,this.maxSpeed),this.isStopped=!1}randomSpawn(t){return t<450?t:Math.floor(450*Math.random()+1)}respawn(){this.position.x=this.GAME_WIDTH,this.position.y=this.randomSpawn(Math.random()*this.GAME_HEIGHT),this.currentSpeed=h(this.minSpeed,this.maxSpeed)}stop(t){this.isStopped=t}draw(){this.obstacleFrames.position.set(this.position.x,this.position.y)}update(){!0===this.isStopped?this.currentSpeed=0:this.position.x-=this.currentSpeed,this.position.x<=0&&(this.position.x=this.GAME_WIDTH,this.position.y=this.randomSpawn(Math.random()*this.GAME_HEIGHT),this.currentSpeed=h(this.minSpeed,this.maxSpeed))}}class d{constructor(t,e,s,i,a,o,n){this.app=t,this.GAME_WIDTH=s,this.GAME_HEIGHT=i,this.scene=n,this.unmutedTexture=a,this.mutedTexture=o,this.sound=document.createElement("audio"),this.sound.src=e,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none",document.body.appendChild(this.sound),this.addTexture(o),this.isMuted=!1}check(){this.btn.on("click",()=>{this.isMuted?(this.stop(),this.scene.removeChild(this.btn),this.addTexture(this.mutedTexture),this.isMuted=!1):(this.play(),this.scene.removeChild(this.btn),this.addTexture(this.unmutedTexture),this.isMuted=!0)})}addTexture(t){this.btn=new PIXI.Sprite(t),this.btn.interactive=!0,this.btn.position.set(this.GAME_WIDTH/100,this.GAME_HEIGHT/8),this.btn.width=50,this.btn.height=50,this.btn.interactive=!0,this.btn.buttonMode=!0,this.scene.addChild(this.btn)}play(){this.sound.play()}stop(){this.sound.pause()}}class l{constructor(t,e,s,i,a,o,n){this.app=t,this.GAME_WIDTH=e,this.GAME_HEIGHT=s,this.animatedTexture=i,this.character=o,this.scene=n,this.position={x:this.GAME_WIDTH-Math.floor(10*Math.random()+1),y:this.GAME_HEIGHT-100},this.maxSpeed=6,this.minSpeed=3,this.enemy=new PIXI.AnimatedSprite.fromFrames(i),this.enemy.position.set(this.position.x,this.position.y),this.enemy.width=100,this.enemy.height=80,this.enemy.animationSpeed=.15,this.enemy.play(),n.addChild(this.enemy),this.maxSpeed=h(this.minSpeed,this.maxSpeed),this.bullet=new PIXI.Sprite(a),this.bullet.width=30,this.bullet.height=15,this.bullet.position.set(this.enemy.position.x+10,this.enemy.position.y+10),n.addChild(this.bullet),this.bulletSpeed=7,this.missedBombs=0}shot(){this.bullet.rotation=1,this.bullet.x-=this.bulletSpeed,this.bullet.y-=this.bulletSpeed,(this.bullet.x+this.bullet.width<=0||this.bullet.y+this.bullet.height<=0)&&(this.bullet.x=this.enemy.x,this.bullet.y=this.enemy.y,this.missedBombs++)}draw(){this.enemy.position.set(this.position.x,this.position.y)}update(){this.position.x-=this.maxSpeed,this.position.x<=0&&(this.position.x=this.GAME_WIDTH-Math.floor(10*Math.random()+1),this.position.y=this.GAME_HEIGHT-100,this.maxSpeed=h(this.minSpeed,this.maxSpeed)),this.shot()}respawn(){this.position.x=this.GAME_WIDTH-Math.floor(10*Math.random()+1),this.position.y=this.GAME_HEIGHT-100,this.maxSpeed=h(this.minSpeed,this.maxSpeed)}}class p{constructor(t,e,s,i,a){this.app=t,this.GAME_WIDTH=s,this.GAME_HEIGHT=i,this.scene=a,this.addTexture(e),this.isPause=!1}check(){this.btn.on("click",()=>{this.isPause?(this.resume(),this.isPause=!1):(this.pause(),this.isPause=!0)})}pause(){this.app.stop()}resume(){this.app.start()}addTexture(t){this.btn=new PIXI.Sprite(t),this.btn.interactive=!0,this.btn.position.set(this.GAME_WIDTH/20,this.GAME_HEIGHT/8),this.btn.width=50,this.btn.height=50,this.btn.interactive=!0,this.btn.buttonMode=!0,this.scene.addChild(this.btn)}}class c{constructor(t,e,s){this.container=new PIXI.Container,this.visible(!1),t.stage.addChild(this.container),this.background=new PIXI.Graphics,this.background.beginFill(36507),this.background.drawRect(0,0,e,s),this.add(this.background)}visible(t){this.container.visible=t}add(t){this.container.addChild(t)}}class u{constructor(t,e,s){this.element=new PIXI.Sprite(t),this.element.position.set(e,s),this.element.anchor.set(.5,.5),this.element.interactive=!0,this.element.buttonMode=!0}addText(t){this.element.addChild(t)}}class m{constructor(t){this.text=new PIXI.Text(t,{font:"22px Arial",fill:0,align:"center",cacheAsBitmap:!0}),this.text.anchor.set(.5,.5)}update(t){this.text=t}}let b,g,x,y,w=null,S=0;function T(){b=new PIXI.Application({width:1366,height:768}),document.body.appendChild(b.view),b.renderer.view.style.position="absolute",b.renderer.view.style.width=window.innerWidth+"px",b.renderer.view.style.height=window.innerHeight+"px",b.renderer.view.style.display="block",b.renderer.view.style.border="8px solid black";const t=["../assets/images/sprites/obstacles/coin-0.png","../assets/images/sprites/obstacles/coin-1.png","../assets/images/sprites/obstacles/coin-2.png","../assets/images/sprites/obstacles/coin-3.png","../assets/images/sprites/obstacles/coin-4.png","../assets/images/sprites/obstacles/coin-5.png","../assets/images/sprites/obstacles/coin-6.png","../assets/images/sprites/obstacles/coin-7.png","../assets/images/sprites/obstacles/coin-8.png","../assets/images/sprites/obstacles/coin-9.png","../assets/images/sprites/obstacles/coin-10.png","../assets/images/sprites/obstacles/coin-11.png","../assets/images/sprites/obstacles/coin-12.png","../assets/images/sprites/obstacles/coin-13.png","../assets/images/sprites/obstacles/coin-14.png"],e=["../assets/images/sprites/crash_plane/explosion-01.png","../assets/images/sprites/crash_plane/explosion-02.png","../assets/images/sprites/crash_plane/explosion-03.png","../assets/images/sprites/crash_plane/explosion-04.png","../assets/images/sprites/crash_plane/explosion-05.png","../assets/images/sprites/crash_plane/explosion-06.png","../assets/images/sprites/crash_plane/explosion-07.png","../assets/images/sprites/crash_plane/explosion-08.png","../assets/images/sprites/crash_plane/explosion-09.png"],s=["../assets/images/sprites/tank/left-1.png","../assets/images/sprites/tank/left-2.png","../assets/images/sprites/tank/left-3.png","../assets/images/sprites/tank/left-4.png"];let h,T,f,M,_,H,E,G;b.loader.baseUrl="assets",b.loader.add("bgBack","../assets/images/parallax/mountains/bgBack_mountain.png").add("bgMiddle","../assets/images/parallax/mountains/bgMid_mountain.png").add("bgFront","../assets/images/parallax/mountains/bgFront_mountain.png").add("bgClouds","../assets/images/parallax/mid_ground_cloud_1.png").add("bgMidClouds","../assets/images/parallax/mid_ground_cloud_2.png").add("bgSky","../assets/images/parallax/sky_color.png").add("bgSkyTop","../assets/images/parallax/sky_color_top.png").add("bgSun","../assets/images/parallax/sun.png").add("character","../assets/images/sprites/plane.png").add(t).add(e).add("soundOn","../assets/images/icons/icons8-sound-100.png").add("soundOff","../assets/images/icons/icons8-sound-speaker-100.png").add(s).add("bullet","../assets/images/sprites/bullet/1.png").add("pause","../assets/images/icons/icons8-pause-100.png").add("restartBtn","../assets/images/icons/restart-btn.png").load((function(){x=new PIXI.Container,x.visible=!0,b.stage.addChild(x),g=new c(b,1366,768),y=new u(b.loader.resources.restartBtn.texture,683,384),w=new m("Restart"),y.addText(w.text),g.add(y.element),G=v(b.loader.resources.bgSun.texture,1366,768,1316,7.68),E=v(b.loader.resources.bgSkyTop.texture,1366,768,0,7.68),H=v(b.loader.resources.bgSky.texture,1366,768,0,768/6.3),M=v(b.loader.resources.bgClouds.texture,1366,768,0,76.8),_=v(b.loader.resources.bgMidClouds.texture,1366,768,0,153.6),h=v(b.loader.resources.bgBack.texture,1366,768,0,368),T=v(b.loader.resources.bgMiddle.texture,1366,768,0,588),f=v(b.loader.resources.bgFront.texture,1366,768,0,668);const P=new i(b,1366,768,b.loader.resources.character.texture,x,b.loader.resources.bullet.texture);new a(P);let B=new o(b,1366,768);S=0,x.addChild(B.scoreText);let C=new o(b,1366,768);g.add(C.scoreText);let W=new n(b,1366,768,x);const X=new d(b,"../assets/sounds/airplanes.wav",1366,768,b.loader.resources.soundOn.texture,b.loader.resources.soundOff.texture,x),D=new p(b,b.loader.resources.pause.texture,1366,768,x);let F=[];for(let e=0;e<7;e++)F.push(new r(b,1366,768,t,x));let O=[];for(let t=0;t<3;t++)O.push(new l(b,1366,768,s,b.loader.resources.bullet.texture,P,x));b.ticker.add((function(t){A-=2,f.tilePosition.x=A,T.tilePosition.x=A/2,h.tilePosition.x=A/4,M.tilePosition.x=A/2,_.tilePosition.x=A/4,P.update(),P.draw(),X.check(),D.check();for(let t=0;t<F.length;t++)F[t].update(),F[t].draw(),k(P.character,F[t].obstacleFrames)?(P.crash(e),F[t].stop(!0),I()):P.score(F[t])&&(S+=57,B.update(S),C.update(S)),k(P.bulletBody,F[t].obstacleFrames)&&(P.stopShot(),F[t].respawn());for(let t=0;t<O.length;t++)O[t].update(),O[t].draw(),W.updateBombText(O[t].missedBombs),(k(P.character,O[t].enemy)||k(P.character,O[t].bullet))&&(P.crash(e),I()),k(P.bulletBody,O[t].enemy)&&(P.stopShot(),O[t].respawn())}))}));let A=0;function v(t,e,s,i,a){let o=new PIXI.TilingSprite(t,e,s);return o.position.set(i,a),x.addChild(o),o}function k(t,e){let s,i,a,o,n;return s=!1,t.centerX=t.x+t.width/2,t.centerY=t.y+t.height/2,e.centerX=e.x+e.width/2,e.centerY=e.y+e.height/2,t.halfWidth=t.width/2,t.halfHeight=t.height/2,e.halfWidth=e.width/2,e.halfHeight=e.height/2,o=t.centerX-e.centerX,n=t.centerY-e.centerY,i=t.halfWidth+e.halfWidth,a=t.halfHeight+e.halfHeight,s=Math.abs(o)<i&&Math.abs(n)<a,s}}function I(){setTimeout(()=>{x.visible=!1,g.visible(!0),y.element.mouseover=()=>{y.element.alpha=.5},y.element.mouseout=()=>{y.element.alpha=1},y.element.on("mousedown",()=>{setTimeout(()=>{for(;b.stage.children[0];)b.stage.removeChild(b.stage.children[0]);b.stage.destroy(!0),document.body.removeChild(b.view),setTimeout(T,3e3)},3e3)})},1e3)}T()}]);