var PLAY,END,gameState;


var trex,trex_img,ground,ground_img,invisibleGround,cloud_img,cloudsGroup,obstaclesGroup,trex_stop,restart,gameOver,restart_img,gameOver_img;

var obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6;

var score;

function preload(){
  trex_img=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img=loadImage("ground2.png");
  cloud_img=loadImage("cloud.png");
  obstacles1=loadImage("obstacle1.png");
  obstacles2=loadImage("obstacle2.png");
  obstacles3=loadImage("obstacle3.png");
  obstacles4=loadImage("obstacle4.png");
  obstacles5=loadImage("obstacle5.png");
  obstacles6=loadImage("obstacle6.png");
  trex_stop=loadAnimation("trexcollided.png");
  gameOver_img=loadImage("gameOver.png");
  restart_img=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(40,150,10,10);
  trex.scale=0.5;
  
  trex.addAnimation("running",trex_img);
  trex.addAnimation("collided",trex_stop);
  
  ground=createSprite(300,180,600,20);
  ground.addImage(ground_img);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(300,190,600,5);
  invisibleGround.visible=false;
  
  restart=createSprite(300,140,10,10);
  gameOver=createSprite(300,120,10,10);
  restart.addImage(restart_img);
  gameOver.addImage(gameOver_img);
  restart.scale=0.5;
  gameOver.scale=0.5;
  restart.visible=false;
  gameOver.visible=false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
  score=0;
  
  PLAY=1;
  END=0;
  gameState=PLAY;
}

function draw() {
  
  background(180);
  text("Score-"+score,400,70);
 
  if(gameState===PLAY){
    
  if(keyDown("space")&& trex.y>=140){
    trex.velocityY=-12;
     }
  
  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisibleGround);
  //console.log(trex.y);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  score=score+Math.round(getFrameRate()/60);
 
  spawnClouds();
  spawnObstacles();
    
  if(trex.isTouching(obstaclesGroup)){
   gameState=END; 
   }
 }   
  
  else if(gameState===END){
    ground.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_stop);
    
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    trex.velocityY=0;
    
    restart.visible=true;
    gameOver.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
    } 
  }
    
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if(World.frameCount%60==0)
{
  var clouds=createSprite(600,150,40,10);
  clouds.y=random(100,130);
  clouds.addImage(cloud_img);
  clouds.scale=0.5;
  clouds.velocityX=-5;
  clouds.depth=trex.depth;
  trex.depth=trex.depth+1;
  clouds.lifetime=150;
  cloudsGroup.add(clouds);
}
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    //obstacle.velocityX = - (6 + 3*count/100);
    obstacle.velocityX=-5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacles1);
      break;
      case 2:obstacle.addImage(obstacles2);
      break;
      case 3:obstacle.addImage(obstacles3);
      break;
      case 4:obstacle.addImage(obstacles4);
      break;
      case 5:obstacle.addImage(obstacles5);
      break;
      case 6:obstacle.addImage(obstacles6);
      break;
      default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_img);
}