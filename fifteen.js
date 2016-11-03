//Game Timer
var posX, posY;
var puzzleOrder;
$(document).ready(function() 
{
	var shufflebutton = document.getElementById("shufflebutton");
	shufflebutton.onclick = shuffle;
	var puzzleArea = $('#puzzlearea');

	var puzzleChildren = $(puzzleArea).children("div");

	puzzleChildren.addClass("puzzlepiece"); 

	puzzleOrder = document.getElementsByClassName("puzzlepiece");

	var a = parseInt($(puzzleArea).css("top"));
	var b = parseInt($(puzzleArea).css("left"));
	var x = -400;
	var y = 0;

	var timerSpace = document.createElement("P");
	var pzl = document.getElementById("puzzlearea");
	var text = document.createTextNode("Timer: 00:00");
	document.getElementById("overall").insertBefore(timerSpace,pzl);



	var timerSpace = document.createElement("P");
	var pzl = document.getElementById("puzzlearea");
	var text = document.createTextNode("Timer: 00:00");
	document.getElementById("overall").insertBefore(timerSpace,pzl)




	timerSpace.id = "timerSpace";
	timerSpace.appendChild(text);
		
	for (var i = 0; i < puzzleOrder.length; i++)
	{
		$(puzzleOrder[i]).css("top",a);
		$(puzzleOrder[i]).css("left",b);
		$(puzzleOrder[i]).css("background-position", x + "px" + " " + y + "px");
		x -= 100;
		b += 100;

		if ((i+1) % 4 == 0 && i != 0)
		{
			a += 100;
			y -= 100;
			b = parseInt($(puzzleArea).css("left"));
		}
		$(puzzleOrder[i]).click(function(){
			if(movable( $(this).css("left"), $(this).css("top") )){
				swap( $(this) );
			}
		});
		$(puzzleOrder[i]).hover(function(){
			if( movable( $(this).css("left"), $(this).css("top") ) ){
				$(this).addClass("movablepiece");

			}
		},
		function(){
			$(this).removeClass("movablepiece");
		});
	}
	posY = 300;
	posX = 300;

});

function shuffle(){
	var myVar = setInterval(timer, 1000);
	console.log("Button clicked");

    var i, l;
    var lst2 = [];
    for(l = 0; l < 100; l++){
        for(i = 0; i < puzzleOrder.length; i++){
            if(movable(puzzleOrder[i].style.left, puzzleOrder[i].style.top)){
                lst2.push([puzzleOrder[i],i]);
            }
        }
        if(lst2.length != 0){
            var rndNum = Math.floor(Math.random() * lst2.length);
            var lst = swap( $(lst2[rndNum]) );
        }
        lst2 = [];
    }
};
	
function swap( pzlPiece ){
	var tempPos = $(pzlPiece).css("top");
	$(pzlPiece).css("top",posY);
	posY = parseInt(tempPos);
	tempPos = $(pzlPiece).css("left");
	$(pzlPiece).css("left",posX);
	posX = parseInt(tempPos);

}

function movable(posLeft, posTop){
	var result = false;
	posLeft = parseInt(posLeft);
	posTop = parseInt(posTop);
	if(posLeft + 100 === posX && posTop === posY){
		result = true;
	}
	else if(posLeft - 100 === posX && posTop === posY){
		result = true;

	}
	else if(posLeft === posX && posTop + 100 === posY){
		result = true;
	}
	else if(posLeft === posX && posTop - 100 === posY){
		result = true;
	}
	return result;
}
var min = 0;
var sec = 0;
function timer(){
	var minSec;
	if(min < 10){
		minSec = "0"+min+":";
	}
	else{
		minSec = min+":";
	}
	if(sec < 10){
		minSec += "0"+sec;
	}
	else{
		minSec += sec;
	}
	if(sec < 60){
		sec++;
		
	}
	else{
		sec = 0;
		min++;
	}
	document.getElementById("timerSpace").innerHTML = "Timer: "+ minSec;
}





