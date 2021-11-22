
var bg_Img;
var knight, kngt_Walk, kngt_Jump;
var demon, demonAttack, demonDeath;
var medusa, medusaAttack, medusaDeath;
var dragon, dragonAttack, dragonDeath;
var genie, genieAttack, genieDeath;
var invis_grnd, invisible, invis;
var plt, plt1, plt2, plt3, plt4;
var coin, coin_Img, coinGroup;
var pltGroup, invisibleGroup;
var coinScore=0;


function preload(){
  bg_Img = loadImage("./Assets/Background_01.png");
  kngt_Walk = loadAnimation("./Knight/walk1.png", "./Knight/walk2.png", "./Knight/walk3.png", "./Knight/walk4.png", "./Knight/walk5.png", 
  "./Knight/walk6.png");
  /*kngt_Jump = loadAnimation("./Knight/jump1.png", "./Knight/jump2.png", "./Knight/jump3.png", "./Knight/jump4.png", "./Knight/jump5.png", 
  "./Knight/jump6.png","./Knight/jump7.png");*/
  plt1 = loadImage("./Assets/Ground_Merged.png");
  plt2 = loadImage("./Assets/Ground.png");
  plt3 = loadImage("./Assets/Ground_i.png");
  plt4 = loadImage("./Assets/Ground_ii.png");
  coin_Img = loadAnimation("./Assets/Coin_01.png", "./Assets/Coin_02.png", "./Assets/Coin_03.png", "./Assets/Coin_04.png", "./Assets/Coin_05.png", "./Assets/Coin_06.png");

  demonAttack = loadAnimation("./Demon/Walk1.png", "./Demon/Attack1.png", "./Demon/Attack2.png", "./Demon/Attack3.png", "./Demon/Attack4.png");
  demonDeath = loadAnimation("./Demon/Death1.png", "./Demon/Death2.png", "./Demon/Death3.png", "./Demon/Death4.png", "./Demon/Death5.png", "./Demon/Death6.png");

  medusaAttack = loadAnimation("./Medusa/Walk1.png", "./Medusa/Attack1.png", "./Medusa/Attack2.png", "./Medusa/Attack3.png", "./Medusa/Attack4.png", "./Medusa/Attack5.png", "./Medusa/Attack6.png");
  medusaDeath = loadAnimation("./Medusa/Death1.png", "./Medusa/Death2.png", "./Medusa/Death3.png", "./Medusa/Death4.png", "./Medusa/Death5.png", "./Medusa/Death6.png");

  dragonAttack = loadAnimation("./Dragon/Walk1.png", "./Dragon/Attack1.png", "./Dragon/Attack2.png", "./Dragon/Attack3.png", "./Dragon/Attack4.png");
  dragonDeath = loadAnimation("./Dragon/Death1.png", "./Dragon/Death2.png", "./Dragon/Death3.png", "./Dragon/Death4.png", "./Dragon/Death5.png");

  genieAttack = loadAnimation("./Genie/Flight1.png", "./Genie/Attack1.png", "./Genie/Attack2.png", "./Genie/Attack3.png", "./Genie/Attack4.png");
  genieDeath = loadAnimation("./Genie/Death1.png", "./Genie/Death2.png", "./Genie/Death3.png", "./Genie/Death4.png");
}

function setup() {
  createCanvas(windowWidth*3,windowHeight);
  invis_grnd = createSprite(windowWidth/2, height-70, windowWidth*5, 10);
  invis_grnd.visible = false;
  
  knight = createSprite(100, height-80, 50, 50);
  knight.addAnimation("walk", kngt_Walk);
  //knight.debug = true;
  knight.setCollider("rectangle",-20,9,40,69);

  pltGroup = new Group();
  invisibleGroup = new Group();
  coinGroup = new Group();
}

function draw() {
  background(bg_Img); 

  if(keyDown(RIGHT_ARROW)){
    knight.x +=5;
  }
  if(keyDown(LEFT_ARROW)){
    knight.x -=5;
  }
  if(keyDown(UP_ARROW)){
    //knight.addAnimation("jump", kngt_Jump);
    knight.velocityY -=2;
  }
  knight.velocityY = knight.velocityY+0.8;

  if(invisibleGroup.isTouching(knight)){
    knight.collide(invisibleGroup);
  }

  knight.collide(invis_grnd);  

  spawnPlatform();
  handlePowerCoins();
  drawSprites();
  textSize(18)
  text("Coins: " + coinScore, 700,50);
}

function spawnPlatform() {
  if (frameCount % 100 === 0) {
    plt = createSprite(windowWidth,500);
    plt.addImage(plt1);
    plt.scale = 0.7;

    grd = createSprite(windowWidth,windowHeight-75);
    grd.velocityX = -7;
    grd.addImage(plt3);

    invisible = createSprite(windowWidth,300)
    invisible.width = plt.width-200;
    invisible.height= 2;

    invis = createSprite(windowWidth,300)
    invis.width = grd.width-15;
    invis.height= 2;

    coin = createSprite(windowWidth, 300, 30, 30);
    coin.addAnimation("spinning",coin_Img);
    coin.scale=0.5;

    plt.x = Math.round(random(windowWidth, windowWidth*4))
    plt.y = Math.round(random(300,700))
    plt.velocityX = -7;

    
    invisible.x = plt.x;
    invisible.y = plt.y-40;
    invisible.velocityX = -7;

    invis.x = grd.x;
    invis.y = grd.y-60;
    invis.velocityX = -7;

    coin.x = plt.x;
    coin.y = plt.y-80;
    coin.velocityX = -7
    //var ran = Math.round(random(1, 2));
    
    pltGroup.add(plt);
    pltGroup.add(grd);
    invisibleGroup.add(invisible);
    invisibleGroup.add(invis);
    coinGroup.add(coin);
  }
}

function handlePowerCoins() {
  knight.overlap(coinGroup, function(collector, collected) {
    coinScore += 1;
    
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });
}

function spawnEnemies(){  
  //create knight after every 150 frames
  if (frameCount % 150 === 0) {
  var rand = Math.round(random(1,4));
    switch(rand){
      case 1: demon = createSprite(100,150,10,10);
              demon.addImage(demonAttack);
              demon.x = plt.x;
              demon.y = plt.y - 20;
              demon.scale =2
              demon.velocityX = -4
              demon.lifetime = 400;
              enemyGroup.add(demon);
  
              /*invdemon = createSprite(1000,205,40,10);
              invdemon.y = demon.y+25;
              invdemon.velocityX = -4
              invdemon.lifetime = 400;
              invdemon.visible=false;
              //invdemon.debug=true;
              invEnemyGroup.add(invdemon);*/
              break;
  
      case 2: medusa = createSprite(100,150,10,10);
              medusa.addImage(medusaAttack);
              medusa.x = plt.x;
              medusa.y = plt.y - 20;
              medusa.scale =2
              medusa.velocityX = -4
              medusa.lifetime = 400;
              enemyGroup.add(medusa);

                /*invmedusa = createSprite(brs,150,40,10);
                invmedusa.y = medusa.y+25;
                invmedusa.velocityX = -4
                invmedusa.lifetime = 400;
                invmedusa.visible=false;
                //invmedusa.debug=true;
                invEnemyGroup.add(invmedusa);*/
              
              break;
  
     case 3:  dragon = createSprite(100,150,10,10);
              dragon.addImage(genieAttack);
              dragon.x = plt.x;
              dragon.y = plt.y - 20;
              dragon.scale =2
              dragon.velocityX = -4
              dragon.lifetime = 400;
              enemyGroup.add(dragon);
  
              /*invgenie = createSprite(1000,160,40,10);
              invgenie.y = genie.y+25;
              invgenie.velocityX = -4
              invgenie.lifetime = 400;
              invgenie.visible=false;
              //invgenie.debug=true;
              invEnemyGroup.add(invgenie);*/
              break;
      
      case 4: genie = createSprite(100,150,10,10);
              genie.addImage(genieAttack);
              genie.x = plt.x;
              genie.y = plt.y - 20;
              genie.scale =2
              genie.velocityX = -4
              genie.lifetime = 400;
              enemyGroup.add(genie);
              
              /*invdemon3 = createSprite(1000,160,40,10);
              invdemon3.y = demon3.y+25;
              invdemon3.velocityX = -4;
              invdemon3.lifetime = 400;
              invdemon3.visible=false;*/
  
      }
    }
  
}
