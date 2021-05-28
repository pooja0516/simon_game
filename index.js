var buttonColors = ["red", "green", "blue", "yellow"];
gamePattern = [];
userPattern = [];
var started = false;
var level = 0;

//keypress at start
$("body").on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//sound to button
$(".btn").click(function() {
  var a = $(this).attr("id");
  userPattern.push(a);
  playSound(a);
  animatePress(a);
  checkAnswer(userPattern.length - 1);
});

//check answer
function checkAnswer(level) {
  if (gamePattern[level] === userPattern[level] ){
      if (gamePattern.length === userPattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }


  //start
  function nextSequence() {
    level++;
    userPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
  }



  //Animation
  function animatePress(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function() {
      $("#" + name).removeClass("pressed");
    }, 100);
  }



  //song selction
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  //startOver
  function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
  }
