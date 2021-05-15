PLAY=1;
END=0;
gameState= PLAY;

var robot , robot_running
var enemy ,enemyImage;
var  enemyGroup,restartImage;
var score,kill;
var backgroundImage,backgroundpic,invisibleGround;
var arrow,arrowImage,arrowGroup;
var knife,knifeImage,knifeGroup;
var life;
var carrotImage,carrotGroup;
var lose,loseImage;

function preload(){
  
  
  robot_running =loadAnimation("robot1.png","robot2.png");
  
enemyImage = loadImage("germ.png");
  foodImage = loadImage("carrot_gold.png");
 backgroundImage=loadImage("background0.png");
loImage=loadImage("restart.png");
  arrowImage = loadImage("arrow0.png");
  knifeImage=loadImage("knife.png");
  carrotImage=loadImage("carrot_gold.png");
  loseImage=loadImage("GA.png");
}



function setup() {
createCanvas(600,600)
  
robot = createSprite(100,345,20,50);
robot.addAnimation("running", robot_running);
robot.scale = 0.5;
 
 lose=createSprite(200,200,30,30);
  lose.addImage(loseImage);
  lose.visible=false;
  
 backgroundpic = createSprite(0,0,600,600);
 backgroundpic.addImage("background",backgroundImage);
 backgroundpic.x = backgroundpic.width /2;
 backgroundpic.scale= 2.5; 

   backgroundpic.depth = robot.depth;
    robot.depth = robot.depth + 1;

  
  invisibleGround = createSprite(200,430,400,10);
  invisibleGround.visible = false;
 
  
  enemyGroup = createGroup();
  
arrowGroup= createGroup();
  knifeGroup=createGroup();
  carrotGroup=createGroup();

  score=0;
  
  life=3;
}


function draw() {
background("white");

  
   
 if (gameState === PLAY){

   
 backgroundpic.velocityX = -2;
  
if (backgroundpic.x < 120) {
  backgroundpic.x = backgroundpic.width / 2;
}
 
  if(keyDown("J")) {
     
    robot.velocityY = -3;
  }     
  robot.velocityY = robot.velocityY + 0.7;
    
   if (keyDown("space")) {
    createArrow();
    
  }
  
  robot.collide(invisibleGround);

  
  
  germ();
   knife();
   carrot();
   
    
    
      
      if (arrowGroup.isTouching(enemyGroup)) {
 enemyGroup.destroyEach();
  arrowGroup.destroyEach();
     
  score=score+1;
}
  
   
     
    if(enemyGroup.isTouching(robot)){
        life=life-1;
       enemyGroup.destroyEach();
  arrowGroup.destroyEach();
     
      
  } 
    
    if(knifeGroup.isTouching(robot)){
        life=life-2;
      enemyGroup.destroyEach();
 
      knifeGroup.destroyEach();
  
      
  } 
   
   if(carrotGroup.isTouching(robot)){
        life=life+2;
      carrotGroup.destroyEach();
      
  } 
  
  if(life<=0){
    gameState=END;
  }
 }
  else if (gameState === END) {
     
     lose.visible=true;
      backgroundpic.velocityX = 0;
      robot.velocityY = 0
    
   
  enemyGroup.setVelocityXEach(0);
 arrowGroup .setVelocityXEach(0);
  knifeGroup.setVelocityXEach(0);
     carrotGroup.setVelocityXEach(0);
    
enemyGroup.setLifetimeEach(-1);
 arrowGroup.setLifetimeEach(-1); 
  knifeGroup.setLifetimeEach(-1);
     carrotGroup.setLifetimeEach(-1);
    
     
     
    

  
  } 
 
  


  
  drawSprites();

 textSize(20);
  fill("white")
  text("kill: "+ score,30,50);
  text("life: "+ life,30,100);
   text("ROBO SHOOTER ",170,50);
    text("press !SPACE! to shoot ",380,50);
 text("press !J! to jump ",380,100);
   text("carrot = life + 1 ",380,130);
   text("knife = life - 2",380,157);
   text("germ = life - 1",380,180);
  text("ONLY 1 CHANCE ",170,120);
} 


function germ(){
  if (frameCount % 76 === 0){
    var g = createSprite(600,390,40,10);
    g.Y= Math.round(random(80,120));
    g.addImage(enemyImage);
    g.scale = 0.6;
    g.velocityX = -3;
    
     //assign lifetime to the variable
    g.lifetime = 200;
    
    
    
    //add each cloud to the group
    enemyGroup.add(g);
  }
}


function knife(){
  if (frameCount % 197 === 0){
    var k= createSprite(600,390,40,10);
    k.Y= Math.round(random(80,120));
    k.addImage(knifeImage);
    k.scale = 0.6;
    k.velocityX = -3;
    
     //assign lifetime to the variable
    k.lifetime = 200;
    
    
    
    //add each cloud to the group
    knifeGroup.add(k);
  }
}



function carrot(){
  if (frameCount % 522 === 0){
    var c= createSprite(600,390,40,10);
    c.Y= Math.round(random(80,120));
    c.addImage(carrotImage);
    c.scale = 0.6;
    c.velocityX = -3;
    
     //assign lifetime to the variable
    c.lifetime = 200;
    
    
    
    //add each cloud to the group
    carrotGroup.add(c);
  }
}


  function createArrow() {
  var arrow= createSprite(100, 300, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 175;
  arrow.y=robot.y;
  arrow.velocityX = 2;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}
  
  
  
  

    


