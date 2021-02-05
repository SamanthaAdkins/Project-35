function preload() {
  balloonAnimation = loadAnimation("Hot2.png","Hot3.png","Hot4.png");
  bg = loadImage("Hot1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,500);

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("animation",balloonAnimation);
    balloon.scale = 0.5;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(bg);  
  drawSprites();

  textSize(20);
  fill("black");
  text("Use Arrow Keys To Move Hot Air Balloon",20,30);

  if(keyDown(LEFT_ARROW)) {
    balloon.x = balloon.x-10;
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x+10;
    writePosition(+10,0);
  }
  else if(keyDown(UP_ARROW)) {
    balloon.y = balloon.y-10;
    writePosition(0,-10);
    balloon.scale = balloon.scale+0.01;
  }
  else if(keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y+10;
    writePosition(0,+10);
    balloon.scale = balloon.scale-0.01;
  }

  drawSprites();
}
function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}