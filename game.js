buttonColors = ["red","blue","green","yellow"];

gamePattern=[]

userClickedPattern =[];
level=0
started=false

//function for a next-sequence game pattern---------------------

function nextSequence() {

    userClickedPattern=[];

    var randomNumber = Math.floor((Math.random()*4))
    randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColor);

    level++;
    $('#level-title').text("Level "+level);
    console.log(gamePattern)
}

// function to play sound---------------------------

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

//to animate buttons when clicked----------------------

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed")

    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// function for checking the answer by taking last index of the clicked pattern----------------------

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success")
    
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            },1000);
        }
    }
    else{
        playsound("wrong");
        $('body').addClass('game-over');
        
        setTimeout(function(){
            $("body").removeClass('game-over');
            //$('h1').text('Game Over, Press Any Key To Start Again!')
            
        },200);
        
        $('h1').html('<h2>Game Over<br>Press Any Key To try Again</h2>');
        $('h1').fadeOut(100).fadeIn();
        startOver();
        
    }
}

function startOver(){
    level=0
    gamePattern=[]
    started=false
}
//button click event trigger----------------------------

$(".btn").on('click',function(event){
    userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    //console.log(userClickedPattern);
    checkAnswer((userClickedPattern.length)-1)
})

//keyboard keys press event trigger----------------------------

$(document).on("keydown",function(){

    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

