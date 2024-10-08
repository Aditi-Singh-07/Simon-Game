// $("h1").text("Bye");
var gamePattern= [];
var buttonColors= ["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started= false;


$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started= true;
  }

});

$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  // console.log(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audi= new Audio('sounds/'+name+'.mp3');
  audi.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence(),1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  $("h1").text("Level    "+ level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour= buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

function startOver(){
  level=0;
  started= false;
  gamePattern=[];
}
