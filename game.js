var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



function nextSequence(){
  userClickedPattern=[];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
 level++;

 //5. Inside nextSequence(), update the h1 with this change in the value of level.
 $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

}


function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}



$(document).keydown(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  playsound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){
  console.log(userClickedPattern,currentLevel);

    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("right");

      if (gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }else{
      $("body").addClass("game-over")
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      playsound("wrong");
      gamePattern=[];
      level=0;
      userClickedPattern=[];
      started=false;
        $("#level-title").text("Game over press any key to restart");



      console.log("wrong");
    }
}
