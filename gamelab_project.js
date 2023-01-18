World.frameRate = 60;

var bg = createSprite(200, 200);
bg.setAnimation("bg");
bg.scale = 0.7;

// var logo = createSprite(40,40);
// logo.setAnimation("logo");
// logo.scale = 0.2;

var snake = createSprite(50, 350);
snake.setAnimation("right");
snake.scale = 0.5;

var snakeGroup = createGroup();
snakeGroup.add(snake);

var tailSize = 20;

var speed = 2; //** Kígyó sebessége
var difficulty = 5; //** Kígyó növekedési sebessége
var pa = 0; //** Personal Assesment
var zeroes = 0; // Nullákra járó pont
var ones = 1; //** Egyesekre járó pont
var mentorBoost = 10; //** Mentor boost
var rnd = 0;
var value = 0;

var logo = createSprite(randomNumber(30, 370), randomNumber(30, 370));
logo.setAnimation("logo");
logo.scale = 0.5;

function randomizeValue() {
  //** esélyek kb. 40% - 0, 40% - 1, 20% - mentorBoost
  rnd = randomNumber(1, 5);
  if (rnd <= 4) {
    value = ones;
  }
  if (rnd <= 2) {
    value = zeroes;
  }
  if (rnd == 5) {
    value = mentorBoost;
  }
}
console.log(rnd + " " + value);

function draw() {
  drawSprites();
  textFont("Trebuchet MS");
  textSize(30);
  if (pa > 80) {
    fill("green");
  }
  if (pa <= 80) {
    fill("yellow");
  }
  if (pa <= 50) {
    fill("red");
  }
  text("PA: " + pa + " %", 30, 30);

  if (keyDown("right")) {
    snake.setSpeedAndDirection(speed, 0);
    snake.setAnimation("right");
  }

  if (keyDown("up")) {
    snake.setSpeedAndDirection(speed, -90);
    snake.setAnimation("up");
  }

  if (keyDown("left")) {
    snake.setSpeedAndDirection(speed, -180);
    snake.setAnimation("left");
  }

  if (keyDown("down")) {
    snake.setSpeedAndDirection(speed, 90);
    snake.setAnimation("down");
  }

  var a = logo.x;
  var b = logo.y;

  if (snake.isTouching(logo)) {
    randomizeValue();

    if (value == zeroes) {
      var dino0 = createSprite(a, b);
      dino0.setAnimation("0");
      playSound(
        "sound://category_achievements/lighthearted_bonus_objective_1.mp3"
      );
      setTimeout(function () {
        dino0.destroy();
      }, 500);
    }

    if (value == ones) {
      var dino1 = createSprite(a, b);
      dino1.setAnimation("1");
      playSound(
        "sound://category_achievements/lighthearted_bonus_objective_4.mp3"
      );
      setTimeout(function () {
        dino1.destroy();
      }, 500);
    }

    if (value == mentorBoost) {
      var dino10 = createSprite(a, b);
      dino10.setAnimation("10");
      playSound("sound://category_achievements/vibrant_power_booster.mp3");
      setTimeout(function () {
        dino10.destroy();
      }, 500);
    }

    pa = pa + value;
    logo.x = randomNumber(30, 370);
    logo.y = randomNumber(30, 370);
    var tail = createSprite(0, 0, tailSize, tailSize);
    tail.shapeColor = rgb(0, randomNumber(80, 200), 0);
    snakeGroup.add(tail);
    for (var i = 0; i < difficulty; i++) {
      tail = createSprite(0, 0, tailSize, tailSize);
      tail.visible = false;
      tail.shapeColor = rgb(0, randomNumber(80, 200), 0);
      snakeGroup.add(tail);
    }
  }

  for (var j = snakeGroup.length - 1; j > 0; j--) {
    snakeGroup.get(j).x = snakeGroup.get(j - 1).x;
    snakeGroup.get(j).y = snakeGroup.get(j - 1).y;
  }

  createEdgeSprites();

  if (snake.isTouching(edges)) {
    snake.setSpeedAndDirection(0, 0);
    logo.visible = false;
    snake.visible = false;
    var gameOver = createSprite(200, 200);
    gameOver.setAnimation("gameOver");
    playSound("sound://category_digital/win.mp3");
  }

  if (pa >= 100) {
    snake.setSpeedAndDirection(0, 0);
    logo.visible = false;
    snake.visible = false;
    textSize(50);
    fill("red");
    text("Gratulálok,\nfull-stack dev\nlettél! :D", 50, 200);
  }
}
