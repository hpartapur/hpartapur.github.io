//Game3


//Declaring variables
{
var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
    
var isrunRight;



var collectable;

}

function setup()
{
    createCanvas(1200,600);
    floorPos_y = height * 5/6;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;


 

    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    
    isrunRight=true;

    countFrame=0;
    score=0;
    score2=0;
    shooting=false;
    peak=false;
    arcx=random(3,4)
    arcy=random(3,4)
    speed=5
    attempts=0
    seconds=24
    grab=false;
    grab2=false;
    grav=2
    gameplay=false
    trajectory=4;
    trajectorx=4;

    collectable={x_pos: 400, y_pos: floorPos_y, size: 50, isFound: false, isFound2: false, size2:30};
    collectable.y_pos-=collectable.size/2

    reset()
}

function draw()
{

	///////////DRAWING CODE//////////

//Scenery
{background(100,155,255); //fill the sky blue
frameRate(28)//set base frame rate
noStroke();
fill(0,155,0);
rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
stroke(255,255,255)
strokeWeight(2)
arc(width*0.33, floorPos_y+50, 100, 100,4.7,1.57, OPEN);
arc(width*0.66, floorPos_y+50, 100, 100,1.57,4.7, OPEN);
ellipse(width/2, height*11/12, 97,97)
fill(255,255,255)
ellipse(width/2, height*11/12, 10,10)
line(width/2, floorPos_y, width/2, height)
}



///////////GAME CHARACTER CODE//////////
{

    stroke(0)
    strokeWeight(1)
  	if(isLeft && isFalling){
		// add your jumping-left code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-35, 20,40)
        sidehead(gameChar_x, gameChar_y-65, 10,20)
        fill(10,0,200)
        rect(gameChar_x-5, gameChar_y-20, 10,18)
        triangle(gameChar_x-5, gameChar_y-9, gameChar_x-5, gameChar_y-2, gameChar_x-12, gameChar_y+2)
         strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x, gameChar_y-45, gameChar_x, gameChar_y-30)
        line(gameChar_x, gameChar_y-30, gameChar_x-10, gameChar_y-20)
        strokeWeight(1)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x-25
        collectable.y_pos=gameChar_y-20
        ball(collectable.x_pos, collectable.y_pos)
        }

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-35, 20,40)
       	sidehead(gameChar_x, gameChar_y-65, 10,20)
        fill(10,0,200)
        rect(gameChar_x-5, gameChar_y-20, 10,18)
        triangle(gameChar_x+5, gameChar_y-9, gameChar_x+5, gameChar_y-2, gameChar_x+12, gameChar_y+2)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x, gameChar_y-45, gameChar_x, gameChar_y-30)
        line(gameChar_x, gameChar_y-30, gameChar_x+10, gameChar_y-20)
        strokeWeight(1)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x+25
        collectable.y_pos=gameChar_y-20
        ball(collectable.x_pos, collectable.y_pos)
        }


	}
	else if(isLeft)
	{
		// add your walking left code
//        fill (255,215,0)
//        ellipse(gameChar_x, gameChar_y-30, 20,40)
//        sidehead(gameChar_x, gameChar_y-60, 10,20)
//        fill(10,0,200)
//        rect(gameChar_x-5, gameChar_y-15, 10,18)
//        triangle(gameChar_x-5, gameChar_y-4, gameChar_x-5, gameChar_y+3, gameChar_x-12, gameChar_y+3)
//        strokeWeight(3)
//        stroke(0,0,255)
//        line(gameChar_x, gameChar_y-45, gameChar_x, gameChar_y-30)
//        line(gameChar_x, gameChar_y-30, gameChar_x-10, gameChar_y-20)
//        strokeWeight(1)
//        if (collectable.isFound&&shooting==false){
//        stroke(0)
//        strokeWeight(2)
//        fill (255,140,0);
//        collectable.x_pos=gameChar_x-25
//        if (isUp){collectable.y_pos=gameChar_y-2}
//        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
//        ball(collectable.x_pos, collectable.y_pos)
        
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
       	sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
//        rect(gameChar_x-5, gameChar_y-15, 10,18)
//        triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x-5, gameChar_y-22, gameChar_x-8, gameChar_y-2)
        line(gameChar_x+3, gameChar_y-12, gameChar_x+8, gameChar_y-2)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x, gameChar_y-35, gameChar_x+2, gameChar_y-27)
        line(gameChar_x+2, gameChar_y-27, gameChar_x+15, gameChar_y-17)
        line(gameChar_x+10, gameChar_y-37, gameChar_x+20, gameChar_y-45)
        strokeWeight(1)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x+25
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)}    
        


	}
	else if(isRight)
	{
		// add your walking right code
//        fill (255,215,0)
//        ellipse(gameChar_x, gameChar_y-30, 20,40)
//       	sidehead(gameChar_x, gameChar_y-60, 10,20)
//        fill(10,0,200)
//        rect(gameChar_x-5, gameChar_y-15, 10,18)
//        triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
//        strokeWeight(3)
//        stroke(0,0,255)
//        line(gameChar_x, gameChar_y-45, gameChar_x, gameChar_y-30)
//        line(gameChar_x, gameChar_y-30, gameChar_x+10, gameChar_y-20)
//        strokeWeight(1)
//        if (collectable.isFound&&shooting==false){
//        stroke(0)
//        strokeWeight(2)
//        fill (255,140,0);
//        collectable.x_pos=gameChar_x+25
//        if (isUp){collectable.y_pos=gameChar_y-2}
//        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
//        ball(collectable.x_pos, collectable.y_pos)
        if(isrunRight==false){
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
       	sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
//        rect(gameChar_x-5, gameChar_y-15, 10,18)
//        triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
        strokeWeight(3)
        stroke(0,0,255)
        var leftright=random(0,1);
        if (leftright==0){
        line(gameChar_x-5, gameChar_y-22, gameChar_x-8, gameChar_y-2)
        line(gameChar_x+3, gameChar_y-12, gameChar_x+8, gameChar_y-2)
        leftright=!leftright
        }else{
        line(gameChar_x-5, gameChar_y-12, gameChar_x-8, gameChar_y-2)
        line(gameChar_x+3, gameChar_y-22, gameChar_x+8, gameChar_y-2)
        leftright=!leftright
        }
        strokeWeight(3)
        stroke(0,0,255)
//        line(gameChar_x, gameChar_y-35, gameChar_x+2, gameChar_y-27)
//        line(gameChar_x+2, gameChar_y-27, gameChar_x+15, gameChar_y-17)
//        line(gameChar_x+10, gameChar_y-37, gameChar_x+20, gameChar_y-45)
        strokeWeight(1)
        countFrame+=1;if (countFrame%7==0){isrunRight=!isrunRight}
        }
        else{
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
       	sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
//      rect(gameChar_x-5, gameChar_y-15, 10,18)
//      triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
        strokeWeight(3)
        stroke(0,0,255)
//        line(gameChar_x-5, gameChar_y-12, gameChar_x-8, gameChar_y-2)
//        line(gameChar_x+3, gameChar_y-22, gameChar_x+8, gameChar_y-2)
        rect(gameChar_x, gameChar_y-12,3,10)
        strokeWeight(3)
        stroke(0,0,255)
//        line(gameChar_x, gameChar_y-35, gameChar_x+10, gameChar_y-37)
//        line(gameChar_x+10, gameChar_y-37, gameChar_x+20, gameChar_y-47)
//        line(gameChar_x+10, gameChar_y-22, gameChar_x+17, gameChar_y-17)
        strokeWeight(1)
        countFrame+=1;if (countFrame%7==0){isrunRight=!isrunRight}
        }

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill (255,215,0)
        rect(gameChar_x-15, gameChar_y-50, 30,35)
        head(gameChar_x, gameChar_y-60, 20)
        fill(10,0,200)
        rect(gameChar_x+3, gameChar_y-15, 12,18)
        rect(gameChar_x-15, gameChar_y-15, 12,18)
        fill(0,0,255)
        textSize(20)
        text("30",gameChar_x-10,gameChar_y-25)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x+25
        collectable.y_pos=gameChar_y-20
        ball(collectable.x_pos, collectable.y_pos)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x+15, gameChar_y-45, gameChar_x+25, gameChar_y-30)
        line(gameChar_x+25, gameChar_y-30, gameChar_x+25, gameChar_y-20)
        strokeWeight(1)
        }



	}
	else//Front Facing
	{
//		// add your standing front facing code
//        fill(255,215,0)
//        rect(gameChar_x-15, gameChar_y-50, 30,35)
//        head(gameChar_x, gameChar_y-60, 20)
//        fill(10,0,200)
//        rect(gameChar_x+3, gameChar_y-15, 12,18)
//        rect(gameChar_x-15, gameChar_y-15, 12,18)
//        fill(0,0,255)
//        textSize(20)
//        text("30",gameChar_x-10,gameChar_y-25)
//        if (collectable.isFound&&shooting==false){
//        stroke(0)
//        strokeWeight(2)
//        fill (255,140,0);
//        collectable.x_pos=gameChar_x+25
//        strokeWeight(3)
//        stroke(0,0,255)
//        line(gameChar_x+15, gameChar_y-45, gameChar_x+25, gameChar_y-20)
//        strokeWeight(1)
//        if (isUp){collectable.y_pos=gameChar_y-2}
//        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
//        ball(collectable.x_pos, collectable.y_pos)
//        }
        
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
       	sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
//        rect(gameChar_x-5, gameChar_y-15, 10,18)
//        triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x-5, gameChar_y-12, gameChar_x-8, gameChar_y-2)
        line(gameChar_x+3, gameChar_y-22, gameChar_x+8, gameChar_y-2)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x, gameChar_y-35, gameChar_x+10, gameChar_y-37)
        line(gameChar_x+10, gameChar_y-37, gameChar_x+20, gameChar_y-47)
        line(gameChar_x+10, gameChar_y-22, gameChar_x+17, gameChar_y-17)
        strokeWeight(1)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x+25
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)}
}
        
    
	}

function ball (x,y){
    fill(100,0,10)
    var bdist=random(0,5)
    if (isRight && !isFalling){ellipse(x+bdist,y,20)}
    else{ellipse(x,y,20)}
    
}
ball(gameChar_x+21, gameChar_y)


 //GRAVITY-If character is above floor level, isFalling is true.
 if (gameChar_y<floorPos_y){isFalling=true,gameChar_y+=grav}
 else{isFalling=false;}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

    if (isRight){gameChar_x +=speed}
    if (isLeft){gameChar_x -=speed}


}


function keyPressed()
{
    if (keyCode==37){isLeft=true;}//if left arrow pressed, move left.
    else if (keyCode==39){isRight=true;}//if arrow pressed, move right
    if (keyCode==38&&gameChar_y==floorPos_y){gameChar_y-=100}//Press up arrow to jump
}

function keyReleased()
{
    if (keyCode==37){isLeft=false;}//When left arrow released, stop moving left
    else if (keyCode==39){isRight=false;}//When right arrow released, stop moving right
    if (keyCode==40&&collectable.isFound){shooting=true,console.log("SHOT")}//When spacebar released, shooting mode.
}
function reset() {//Every time the ball drops, to restart gameplay
    gameChar_x=width*0.47
    gameChar_y=floorPos_y
    gameChar_x2=width*0.53
    gameChar_y2=floorPos_y
    stroke(0,255,0)
    attempts+=1
    isPlummeting=false;
    gameplay=false;
    trajectory=4;
}



//////Color Scheme Functions////////
function head(x,y,diameter){
	skincolor()
	ellipse(x,y, diameter, diameter)
}
function sidehead(x,y,width,height){
	skincolor()
	ellipse(x,y,width,height)
}
function skincolor (){fill(245,222,179)}
