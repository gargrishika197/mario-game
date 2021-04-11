var back1,backimg
var mario,marioanimation,mariodie;
var ground ;
var brick,brickimg,brickGroup;
var obstacle,obstacleAnimation,obstacleGroup;
var gameover,gameoverImage,reset,resetImage;
var score=0;
var gameState="play"

function preload(){
backimg=loadImage("bg.png");
brickimg=loadImage("brick.png");
gameoverImage=loadImage("gameOver.png");
resetImage=loadImage("restart.png");
marioanimation=loadAnimation("mario00.png","mario02.png","mario03.png");
mariodie=loadAnimation("collided.png");
obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");

}

function setup(){
imageMode(CENTER);
createCanvas (800,400);
back1=createSprite(600,200);
backimg.resize(1600,400);
back1.addImage(backimg);
back1.velocityX=-4;

ground=createSprite(100,350,100,10)
ground.visible=false;

mario=createSprite(100,310)
mario.addAnimation("running",marioanimation)
mario.addAnimation("die",mariodie)
mario.setCollider("rectangle",0,0,20,mario.height)
mario.scale=2

gameover=createSprite(400,100);
gameover.addImage(gameoverImage);
gameover.visible=false;

reset=createSprite(400,150);
reset.addImage(resetImage);
reset.visible=false;
reset.scale=0.5

brickGroup=new Group();
obstacleGroup=new Group();

}

function draw(){

if(gameState==="play"){

  if(back1.x<0){
   back1.x=back1.width/2
   }

 mario.changeAnimation("running",marioanimation)

  score=score+Math.round(getFrameRate()/60)

  if(keyDown("space")&& mario.y>300){
  mario.velocityY=-13
   }

mario.velocityY+=0.5

if(mario.isTouching(brickGroup)){
   brickGroup.destroyEach()
  }

  if(mario.isTouching(obstacleGroup)){
    gameState="end"
  }

  Obstacle();
 bricks();

}

if(gameState==="end"){

back1.velocityX=0
brickGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
brickGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
mario.changeAnimation("die",mariodie);
gameover.visible=true;
reset.visible=true;

if(mousePressedOver(reset)){
    restartgame()
}

}

mario.collide(ground);

 drawSprites();

 textSize(20);
 fill("red")
 text("Score : "+score,650,100)

}

function bricks(){
if(frameCount%250===0){
var randY=Math.round(random(150,250))
brick=createSprite(800,randY)
brick.addImage(brickimg)
brick.velocityX=-4
brick.lifetime=400
brickGroup.add(brick)
}
}

function Obstacle(){

if(frameCount%200===0){
obstacle=createSprite(800,320)
obstacle.addAnimation("obstacles",obstacleAnimation);
obstacle.lifetime=400
obstacle.velocityX=-4
obstacleGroup.add(obstacle)

}
}

function restartgame(){
  gameState="play"
  reset.visible=false;    
  gameover.visible=false;
  back1.velocityX=-4;
  brickGroup.destroyEach()
  obstacleGroup.destroyEach()
 score=0;

}



