var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,banana_img;
var gameOver,gameOver_img;
var stone,stone_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var Score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  gameOver_img = loadImage("gameOver.png");
  stone_img = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
 
 bananaGroup = new Group();
 stoneGroup = new Group();
  
}

function draw() { 
  background(0);

  drawSprites();

  textSize(20);
  stroke("white");
  fill('white');
  text("SCORE: " + Score,550,50);

  if(gameState===PLAY){

    SpawnBanana();
    SpawnStone();

    if(bananaGroup.isTouching(player)){
       bananaGroup.destroyEach();
       Score = Score+2;
       player.scale +=0.02;
    
    }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
     
    if(stoneGroup.isTouching(player)){
      gameState = END;
    }
  
  }
  else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    bananaGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(30);
    fill("blue");
    text("GAME - OVER",300,220);
    
  }
 
}
function SpawnBanana(){
    if(frameCount % 80 === 0){
      banana = createSprite(600,250,40,10);
      banana.y = random(120,200);
      banana.addImage("banana",banana_img);
      banana.scale = 0.05;
      banana.velocityX = -4;
      banana.lifetime = 300;
      player.depth = banana.depth + 1;
      bananaGroup.add(banana);
    }
}
function SpawnStone(){
    if(frameCount % 300 === 0){
      stone = createSprite(800,350,10,10);
      stone.velocityX = -6;
      stone.addImage("stone",stone_img);
      stone.scale = 0.2;
      stone.lifetime = 300;
      stoneGroup.add(stone);
    }
}
