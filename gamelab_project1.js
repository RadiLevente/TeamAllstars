World.frameRate = 60;

var bg = createSprite(200, 200);
bg.setAnimation("bg");
bg.scale = 0.7;

var snake = createSprite(50, 350);
snake.setAnimation("right");
snake.scale = 2.5;

var snakeGroup = createGroup();
snakeGroup.add(snake);

var tailSize = 20;

var speed = 2; //** Kígyó sebessége
var difficulty = 4; //** Kígyó növekedési sebessége
var pa = 0; //** Personal Assesment
var zeroes = 0; //** Nullákra járó pont
var ones = 1; //** Egyesekre járó pont
var mentorBoost = 10; //** Mentor boost
var rnd = 0;
var value = 0;

var logo = createSprite(randomNumber(50, 350), randomNumber(50, 350));
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

function winning() {
  snake.setSpeedAndDirection(0, 0);
  logo.visible = false;
  snake.visible = false;
  snake.destroy();
  logo.destroy();
  fill("green");
  pa = 0;
  var trophy = createSprite(200, 200);
  playSpeech("Congratulations!", "male", "English");
  playSpeech(
    "you are now a junior allstar full stack developer!",
    "male",
    "English"
  );
  trophy.setAnimation("trophy");
}

function losing() {
  snake.setSpeedAndDirection(0, 0);
  snake.x = 200;
  snake.y = 200;
  logo.visible = false;
  snake.visible = false;
  playSpeech("Game over... next time try harder ", "male", "English");
  var gameOver = createSprite(200, 200);
  gameOver.setAnimation("gameOver");
}

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
  text("PA: " + pa + " %", 10, 30);

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
      var bonus0 = createSprite(a, b);
      bonus0.setAnimation("0");
      bonus0.scale = 0.1;
      playSound(
        "sound://category_achievements/lighthearted_bonus_objective_1.mp3"
      );
      setTimeout(function () {
        bonus0.destroy();
      }, 500);
    }

    if (value == ones) {
      var bonus1 = createSprite(a, b);
      bonus1.setAnimation("1");
      bonus1.scale = 0.1;
      playSound(
        "sound://category_achievements/lighthearted_bonus_objective_4.mp3"
      );
      setTimeout(function () {
        bonus1.destroy();
      }, 500);
    }

    if (value == mentorBoost) {
      var bonus10 = createSprite(a, b);
      bonus10.setAnimation("10");
      bonus10.scale = 2;
      playSpeech(
        "You've received a boost from your mentor!",
        "male",
        "English"
      );
      setTimeout(function () {
        bonus10.destroy();
      }, 800);
    }

    pa += value;
    logo.destroy();
    setTimeout(function () {
      logo = createSprite(randomNumber(50, 350), randomNumber(50, 350));
      logo.setAnimation("logo");
      logo.scale = 0.5;
    }, 1000);

    logo.x = randomNumber(50, 350);
    logo.y = randomNumber(50, 350);
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
    losing();
  }

  if (pa >= 100) {
    winning();
  }
}
