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

var isLeft2;
var isRight2;
var isFalling2;
var gameChar_x2;
var gameChar_y2;
var shooting2;

var collectable;


var isUp;
var countFrame;

var score;
var score2;
var shooting;
var peak;
var arcx;
var arcy;

var speed;
var attempts;

var grab;
var grab2;
var trajectory;
var trajectoryx;

}

function setup()
{
    createCanvas(1200,600);
    floorPos_y = height * 5/6;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;


    gameChar_x2=100
    gameChar_y2=floorPos_y
    isLeft2=false;
    isRight2=false;
    isFalling2=false;
    shooting2=false;

    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    isUp=false;
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



//Dribble Frame Rate
countFrame+=1;if (countFrame%4==0){isUp=!isUp}

//Shot Clock
if (countFrame%21==0&&gameplay==true){seconds--}
if (seconds==0){reset()}

//HOOP
{stroke(1);strokeWeight(1)
fill(255,255,255)
rect(width*7/8, floorPos_y-100, 10, 100);//hoop post
rect((width*7/8)-40, floorPos_y-140, 80, 50)//backboard
fill(70,130,180);rect((width*7/8)-30, floorPos_y-130, 60, 40)//backboard blue
fill(255,255,255,80)
strokeWeight(5);stroke(255,0,0);ellipse((width*7/8), floorPos_y-105, 40, 20)//ring
noStroke()
strokeWeight(1)}
fill(0,0,255)
textSize(25)
text("GSW",width*13.8/16,floorPos_y+30)

//HOOP2
{stroke(1), strokeWeight(1)
fill(255,255,255)
rect(width*1/8, floorPos_y-100, 10, 100);//hoop post
rect((width*1/8)-40, floorPos_y-140, 80, 50)//backboard
fill(70,130,180);rect((width*1/8)-30, floorPos_y-130, 60, 40)//backboard blue
fill(255,255,255,80)
strokeWeight(5);stroke(255,0,0);ellipse((width*1/8), floorPos_y-105, 40, 20)//ring
noStroke()
strokeWeight(1)}
fill(128,0,128)
textSize(25)
text("LAL",width*0.9/8,floorPos_y+30)
fill(255,255,255,80)
textSize(15)
text("W/Up Arrow: Jump", width*0.05, height*0.05)
text("D/Right Arrow: Sprint Right",width*0.05, height*0.08)
text("A/Left Arrow: Sprint Left",width*0.05, height*0.11)
text("S/Down Arrow: Shoot",width*0.05, height*0.14)
textSize(25)

//Scoreboard
fill(150,150,100,150)
rect(width*0.41,30,195,30)
fill(0,0,200)
text("GSW: "+score, width*0.41, 50)
fill(128,0,128)
text("LAL: "+score2, width*0.41,70)
fill(255,0,0)
//text (seconds, width*0.5, 100)




    //Shooting Condition
    //If ball picked up and shooting
    if (shooting&&collectable.isFound){
//        if (gameChar_x< width*7/8){collectable.x_pos+=arcx}//if character on right side, shoot left
//        else{collectable.x_pos-=arcx}//if character on left, shoot right
//        if (collectable.y_pos>floorPos_y-200&&peak==false){collectable.y_pos-=arcy}
//        else{collectable.y_pos+=arcy,peak=true}
//        ball(collectable.x_pos, collectable.y_pos)
        collectable.x_pos+=trajectorx
        collectable.y_pos-=trajectory
        ball(collectable.x_pos, collectable.y_pos)
        trajectory-=0.09

    }
    if (shooting2&&collectable.isFound2){
//        if (gameChar_x2<width*1/8)
//        {collectable.x_pos+=arcx}
//        else{collectable.x_pos-=arcx}
//        if (collectable.y_pos>floorPos_y-200&&peak==false){collectable.y_pos-=arcy}
//        else{collectable.y_pos+=arcy,peak=true}
//        ball(collectable.x_pos, collectable.y_pos)
        collectable.x_pos-=trajectorx
        collectable.y_pos-=trajectory
        ball(collectable.x_pos, collectable.y_pos)
        trajectory-=0.09
    }

    //Scoring Condition
    //If in shooting mode and the distance between the collectable and the hoop is less than 20
    //Console prints Score!, the collectable is reset to false, and both character and collectable are set to random x coordinate
    //Scoreboard shooting is increased by 2
    if (shooting&&dist(width*7/8, floorPos_y-110, collectable.x_pos,collectable.y_pos)<21){
        console.log("Score!")
        if (gameChar_x<width*0.66){score+=1}
        reset()
        score+=2
    }
    if (shooting2 &&dist(width*1/8, floorPos_y-110, collectable.x_pos,collectable.y_pos)<21){
        console.log("Score!")
				if (gameChar_x2>width*0.33){score2+=1}
        reset()
        score2+=2
    }




    //Missing Condition
    //If in shooting mode and basketball drops below floor level
    //Reset
    if (shooting&&collectable.isFound&&collectable.y_pos>floorPos_y){
        reset()
    }
    if (shooting2&&collectable.isFound2&&collectable.y_pos>floorPos_y){
        reset()
    }

    //Ball state before being found
    if (collectable.isFound==false && collectable.isFound2==false){
        ball(collectable.x_pos, floorPos_y)
    }
    //isFound Mode: If character is less than 40 away from ball, ball is picked up. Ball is in isFound mode
//    if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)<40){collectable.isFound=true, collectable.isFound2=false;}
//
//    if (dist(gameChar_x2, gameChar_y2, collectable.x_pos, collectable.y_pos)<40){collectable.isFound2=true, collectable.isFound=false;}

    if (dist(gameChar_x2, gameChar_y2, collectable.x_pos, collectable.y_pos)<dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)
       &&dist(gameChar_x2, gameChar_y2, collectable.x_pos, collectable.y_pos)<40)
    {collectable.isFound2=true, collectable.isFound=false;}
    if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)<dist(gameChar_x2, gameChar_y2, collectable.x_pos, collectable.y_pos)
       &&dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)<40)
    {collectable.isFound=true, collectable.isFound2=false;}


///////////GAME CHARACTER CODE//////////
{

    stroke(0)
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
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
        sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
        rect(gameChar_x-5, gameChar_y-15, 10,18)
        triangle(gameChar_x-5, gameChar_y-4, gameChar_x-5, gameChar_y+3, gameChar_x-12, gameChar_y+3)
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
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
        }


	}
	else if(isRight)
	{
		// add your walking right code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
       	sidehead(gameChar_x, gameChar_y-60, 10,20)
        fill(10,0,200)
        rect(gameChar_x-5, gameChar_y-15, 10,18)
        triangle(gameChar_x+5, gameChar_y-4, gameChar_x+5, gameChar_y+3, gameChar_x+12, gameChar_y+3)
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
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
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
		// add your standing front facing code
        fill(255,215,0)
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
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x+15, gameChar_y-45, gameChar_x+25, gameChar_y-20)
        strokeWeight(1)
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
        }
}
	}


///////////GAME CHARACTER 2 CODE//////////
{

    stroke(0)
  	if(isLeft2 && isFalling2){
		// add your jumping-left code
        fill (128,0,128)
        ellipse(gameChar_x2, gameChar_y2-35, 20,40)
        sidehead(gameChar_x2, gameChar_y2-65, 10,20)
        fill(10,0,200)
        rect(gameChar_x2-5, gameChar_y2-20, 10,18)
        triangle(gameChar_x2-5, gameChar_y2-9, gameChar_x2-5, gameChar_y2-2, gameChar_x2-12, gameChar_y2+2)
         strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2, gameChar_y2-45, gameChar_x2, gameChar_y2-30)
        line(gameChar_x2, gameChar_y2-30, gameChar_x2-10, gameChar_y2-20)
        strokeWeight(1)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2-25
        collectable.y_pos=gameChar_y2-20
        ball(collectable.x_pos, collectable.y_pos)
        }

	}
	else if(isRight2 && isFalling2)
	{
		// add your jumping-right code
        fill (128,0,128)
        ellipse(gameChar_x2, gameChar_y2-35, 20,40)
        sidehead(gameChar_x2, gameChar_y2-65, 10,20)
        fill(10,0,200)
        rect(gameChar_x2-5, gameChar_y2-20, 10,18)
        triangle(gameChar_x2+5, gameChar_y2-9, gameChar_x2+5, gameChar_y2-2, gameChar_x2+12, gameChar_y2+2)
        strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2, gameChar_y2-45, gameChar_x2, gameChar_y2-30)
        line(gameChar_x2, gameChar_y2-30, gameChar_x2+10, gameChar_y2-20)
        strokeWeight(1)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2+25
        collectable.y_pos=gameChar_y2-20
        ball(collectable.x_pos, collectable.y_pos)
        }


	}
	else if(isLeft2)
	{
		// add your walking left code
        fill (128,0,128)
        ellipse(gameChar_x2, gameChar_y2-30, 20,40)
        sidehead(gameChar_x2, gameChar_y2-60, 10,20)
        fill(10,0,200)
        rect(gameChar_x2-5, gameChar_y2-15, 10,18)
        triangle(gameChar_x2-5, gameChar_y2-4, gameChar_x2-5, gameChar_y2+3, gameChar_x2-12, gameChar_y2+3)
        strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2, gameChar_y2-45, gameChar_x2, gameChar_y2-30)
        line(gameChar_x2, gameChar_y2-30, gameChar_x2-10, gameChar_y2-20)
        strokeWeight(1)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2-25
        if (isUp){collectable.y_pos=gameChar_y2-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
        }


	}
	else if(isRight2)
	{
		// add your walking right code
        fill (128,0,128)
        ellipse(gameChar_x2, gameChar_y2-30, 20,40)
				sidehead(gameChar_x2, gameChar_y2-60, 10,20)
        fill(10,0,200)
        rect(gameChar_x2-5, gameChar_y2-15, 10,18)
        triangle(gameChar_x2+5, gameChar_y2-4, gameChar_x2+5, gameChar_y2+3, gameChar_x2+12, gameChar_y2+3)
        strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2, gameChar_y2-45, gameChar_x2, gameChar_y2-30)
        line(gameChar_x2, gameChar_y2-30, gameChar_x2+10, gameChar_y2-20)
        strokeWeight(1)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2+25
        if (isUp){collectable.y_pos=gameChar_y2-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
        }

	}
	else if(isFalling2 || isPlummeting)
	{
		// add your jumping facing forwards code
        fill (128,0,128)
        rect(gameChar_x2-15, gameChar_y2-50, 30,35)
        fill(245,222,179)
        ellipse(gameChar_x2, gameChar_y2-60, 20,20)
        fill(10,0,200)
        rect(gameChar_x2+3, gameChar_y2-15, 12,18)
        rect(gameChar_x2-15, gameChar_y2-15, 12,18)
        fill(255,215,0)
        textSize(20)
        text("23",gameChar_x2-10,gameChar_y2-25)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2+25
        collectable.y_pos=gameChar_y2-20
        ball(collectable.x_pos, collectable.y_pos)
        strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2+15, gameChar_y2-45, gameChar_x2+25, gameChar_y2-30)
        line(gameChar_x2+25, gameChar_y2-30, gameChar_x2+25, gameChar_y2-20)
        strokeWeight(1)
        }



	}
	else//Front Facing
	{
		// add your standing front facing code
        fill (128,0,128)
        rect(gameChar_x2-15, gameChar_y2-50, 30,35)
        head(gameChar_x2,gameChar_y2-60, 20)
        fill(10,0,200)
        rect(gameChar_x2+3, gameChar_y2-15, 12,18)
        rect(gameChar_x2-15, gameChar_y2-15, 12,18)
        fill(255,215,0)
        textSize(20)
        text("23",gameChar_x2-10,gameChar_y2-25)
        if (collectable.isFound2&&shooting2==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x2+25
        strokeWeight(3)
        stroke(255,215,0)
        line(gameChar_x2+15, gameChar_y2-45, gameChar_x2+25, gameChar_y2-20)
        strokeWeight(1)
        if (isUp){collectable.y_pos=gameChar_y2-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ball(collectable.x_pos, collectable.y_pos)
        }
}
	}



 //GRAVITY-If character is above floor level, isFalling is true.
 if (gameChar_y<floorPos_y){isFalling=true,gameChar_y+=grav}
 else{isFalling=false;}
 if (gameChar_y2<floorPos_y){isFalling2=true, gameChar_y2+=grav}
 else{isFalling2=false;}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

    if (isRight){gameChar_x +=speed}
    if (isLeft){gameChar_x -=speed}
    if (isRight2){gameChar_x2 +=speed}
    if (isLeft2){gameChar_x2 -=speed}



}


function keyPressed()
{
    if (keyCode==37){isLeft=true;}//if left arrow pressed, move left.
    else if (keyCode==39){isRight=true;}//if arrow pressed, move right
    if (keyCode==38&&gameChar_y==floorPos_y){gameChar_y-=100}//Press up arrow to jump

    if (keyCode==65){isLeft2=true}//if A pressed, move left
    else if (keyCode==68){isRight2=true}//if D pressed, move right
    if (keyCode==87&&gameChar_y2==floorPos_y){gameChar_y2-=100}//if W pressed, jump

    if(keyCode==20){grab2=true}
    if(keyCode==13){grab=true}
    if (keyCode==32){gameplay=true}
}

function keyReleased()
{
    if (keyCode==37){isLeft=false;}//When left arrow released, stop moving left
    else if (keyCode==39){isRight=false;}//When right arrow released, stop moving right
    if (keyCode==40&&collectable.isFound){shooting=true,console.log("SHOT")}//When spacebar released, shooting mode.

    if (keyCode==65){isLeft2=false}
    else if (keyCode==68){isRight2=false}
    if (keyCode==83&&collectable.isFound2){shooting2=true}

    if(keyCode==20){grab2=false}
    if(keyCode==13){grab=false}
}
function reset() {//Every time the ball drops, to restart gameplay
  collectable.isFound=false;
  shooting=false;shooting2=false;
  isFound=false;isFound2=false;
  peak=false;
  seconds=24;
  collectable={x_pos: width/2, y_pos: floorPos_y-90, size: 50, isFound: false, isFound2:false, size2:30};
  collectable.y_pos-=collectable.size/2
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
function ball(x,y){ //Draws ball at collectable position
	stroke(0)
	strokeWeight(2)
	fill (255,140,0);
	collectable.x_pos=x
	ellipse(collectable.x_pos,collectable.y_pos, collectable.size2, collectable.size2)
	fill(0)
	line (collectable.x_pos+(collectable.size2/2), collectable.y_pos, collectable.x_pos-(collectable.size2/2), collectable.y_pos)
	line (collectable.x_pos, collectable.y_pos+(collectable.size2/2), collectable.x_pos, collectable.y_pos-(collectable.size2/2))
	line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
	line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
	line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
	line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
	strokeWeight(1)
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
