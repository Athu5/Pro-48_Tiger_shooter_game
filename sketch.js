var bg,bgImg;
var player, shooterImg, shooter_shooting;
var tiger, tigerImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var tigerGroup;
var score = 0;
var life = 3;
var bullets = 70;
var heart1, heart2, heart3
var gameState = "fight"
var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  tigerImg = loadImage("assets/tiger.png")

  bgImg = loadImage("assets/jungle.jpeg")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

    bulletGroup = new Group()
    tigerGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  if(life===0){
    gameState = "lost"
    
  }


  if(score==50){
    gameState = "won"
    winning.play();
  }

if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
  explosionSound.play();
}


else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(bullets==0){
  gameState = "bullet"
  lose.play();
    
}


if(tigerGroup.isTouching(bulletGroup)){
  for(var i=0;i<tigerGroup.length;i++){     
      
   if(tigerGroup[i].isTouching(bulletGroup)){
        tigerGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}


if(tigerGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<tigerGroup.length;i++){     
      
  if(tigerGroup[i].isTouching(player)){
       tigerGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

enemy();
}




drawSprites();


textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)


if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  tigerGroup.destroyEach();
  player.destroy();

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  tigerGroup.destroyEach();
  player.destroy();

}


else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  tigerGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}

function enemy(){
  if(frameCount%50===0){

    tiger = createSprite(random(1400,1600),random(500,1000),40,40)

    tiger.addImage(tigerImg)
    tiger.scale = 0.15
    tiger.velocityX = -3
    tiger.debug= true
    tiger.setCollider("rectangle",0,0,500,500)
   
    tiger.lifetime = 400
    tigerGroup.add(tiger)
  }

}
