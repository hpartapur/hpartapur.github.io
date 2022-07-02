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

var collectable;
var canyon;

var isUp;
var countFrame;

var score;
var shooting;
var peak;
var arcx;
var arcy;

var speed;
var attempts;
}

function setup()
{
    createCanvas(1024, 576);
	  floorPos_y = height * 3/4;
    gameChar_x = width/2;
	  gameChar_y = floorPos_y;

    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    isUp=false;
    countFrame=0;
    score=0
    shooting=false;
    peak=false;
    arcx=random(2,3)
    arcy=random(2,3)
    speed=3
    attempts=0

    collectable={x_pos: 400, y_pos: floorPos_y, size: 50, isFound: false,size2:30};
    canyon={x_pos: 750, width: 120};
    collectable.y_pos-=collectable.size/2
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
//draw the canyon
noStroke();
fill(255);
fill(100, 155, 255)
rect(canyon.x_pos,380,canyon.width,200);}

//Dribble Frame Rate
countFrame+=1;if (countFrame%4==0){isUp=!isUp}

//HOOP
{stroke(1)
fill(255,255,255)
rect(width*7/8, floorPos_y-100, 10, 100);//hoop post
rect((width*7/8)-40, floorPos_y-140, 80, 50)//backboard
fill(70,130,180);rect((width*7/8)-30, floorPos_y-130, 60, 40)//backboard blue
fill(255,255,255,80)
strokeWeight(5);stroke(255,0,0);ellipse((width*7/8), floorPos_y-105, 40, 20)//ring
noStroke()
strokeWeight(1)}

//Scoreboard
text("Score: "+score, 70, 70)
text("Attempts: "+attempts, 70, 90)



    //Shooting Condition
    //If ball picked up and shooting
    if (shooting&&collectable.isFound){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        if (gameChar_x< width*7/8){collectable.x_pos+=arcx}//if character on right side, shoot left
        else{collectable.x_pos-=arcx}//if character on left, shoot right
        if (collectable.y_pos>floorPos_y-200&&peak==false){collectable.y_pos-=arcy}
        else{collectable.y_pos+=arcy,peak=true}
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

    //Scoring Condition
    //If in shooting mode and the distance between the collectable and the hoop is less than 20
    //Console prints Score!, the collectable is reset to false, and both character and collectable are set to random x coordinate
    //Scoreboard shooting is increased by 2
    if (shooting&&dist(width*7/8, floorPos_y-110, collectable.x_pos,collectable.y_pos)<20){
        console.log("Score!")
        reset()
        textSize(1000)
        score+=2
    }


    //Missing Condition
    //If in shooting mode and basketball drops below floor level
    //Reset
    if (shooting&&collectable.isFound&&collectable.y_pos>floorPos_y){
        reset()
    }

    //Ball state before being found
    if (collectable.isFound==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        ellipse(collectable.x_pos,collectable.y_pos, collectable.size, collectable.size)
        fill(0)
        line (collectable.x_pos+(collectable.size/2), collectable.y_pos, collectable.x_pos-(collectable.size/2), collectable.y_pos)
        line (collectable.x_pos, collectable.y_pos+(collectable.size/2), collectable.x_pos, collectable.y_pos-(collectable.size/2))
        line (collectable.x_pos-((collectable.size/6)*2), collectable.y_pos-((collectable.size/6)*2),collectable.x_pos-collectable.size/5,collectable.y_pos)
        line (collectable.x_pos-((collectable.size/6)*2), collectable.y_pos+((collectable.size/6)*2),collectable.x_pos-collectable.size/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size/6)*2), collectable.y_pos-((collectable.size/6)*2),collectable.x_pos+collectable.size/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size/6)*2), collectable.y_pos+((collectable.size/6)*2),collectable.x_pos+collectable.size/5,collectable.y_pos)
        strokeWeight(1)
    }
    //isFound Mode: If character is less than 40 away from ball, ball is picked up. Ball is in isFound mode
    if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos)<40){collectable.isFound=true;}


///////////GAME CHARACTER CODE//////////
{

    stroke(0)
  	if(isLeft && isFalling){
		// add your jumping-left code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-35, 20,40)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-65, 10,20)
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
        ellipse(collectable.x_pos,collectable.y_pos, collectable.size2, collectable.size2)
        fill(0)
        line (collectable.x_pos+(collectable.size2/2), collectable.y_pos, collectable.x_pos-(collectable.size2/2), collectable.y_pos)
        line (collectable.x_pos, collectable.y_pos+(collectable.size2/2), collectable.x_pos, collectable.y_pos-(collectable.size2/2))
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        strokeWeight(1)}

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-35, 20,40)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-65, 10,20)
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


	}
	else if(isLeft)
	{
		// add your walking left code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-60, 10,20)
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


	}
	else if(isRight)
	{
		// add your walking right code
        fill (255,215,0)
        ellipse(gameChar_x, gameChar_y-30, 20,40)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-60, 10,20)
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

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill (255,215,0)
        rect(gameChar_x-15, gameChar_y-55, 30,35)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-65, 20,20)
        fill(10,0,200)
        rect(gameChar_x+3, gameChar_y-20, 12,18)
        rect(gameChar_x-15, gameChar_y-20, 12,18)
        fill(0,0,255)
        textSize(20)
        text("30",gameChar_x-10,gameChar_y-30)
        if (collectable.isFound&&shooting==false){
        stroke(0)
        strokeWeight(2)
        fill (255,140,0);
        collectable.x_pos=gameChar_x+25
        collectable.y_pos=gameChar_y-20
        ellipse(collectable.x_pos,collectable.y_pos, collectable.size2, collectable.size2)
        fill(0)
        line (collectable.x_pos+(collectable.size2/2), collectable.y_pos, collectable.x_pos-(collectable.size2/2), collectable.y_pos)
        line (collectable.x_pos, collectable.y_pos+(collectable.size2/2), collectable.x_pos, collectable.y_pos-(collectable.size2/2))
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        strokeWeight(1)
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
        fill (255,215,0)
        rect(gameChar_x-15, gameChar_y-50, 30,35)
        fill(245,222,179)
        ellipse(gameChar_x, gameChar_y-60, 20,20)
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
        if (isUp){collectable.y_pos=gameChar_y-2}
        else{collectable.y_pos=floorPos_y-(collectable.size2/2)}
        ellipse(collectable.x_pos,collectable.y_pos, collectable.size2, collectable.size2)
        fill(0)
        line (collectable.x_pos+(collectable.size2/2), collectable.y_pos, collectable.x_pos-(collectable.size2/2), collectable.y_pos)
        line (collectable.x_pos, collectable.y_pos+(collectable.size2/2), collectable.x_pos, collectable.y_pos-(collectable.size2/2))
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos-((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos-collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos-((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        line (collectable.x_pos+((collectable.size2/6)*2), collectable.y_pos+((collectable.size2/6)*2),collectable.x_pos+collectable.size2/5,collectable.y_pos)
        strokeWeight(3)
        stroke(0,0,255)
        line(gameChar_x+15, gameChar_y-45, gameChar_x+25, gameChar_y-20)
        strokeWeight(1)
        }
}
	}

 //GRAVITY-If character is above floor level, isFalling is true.
 if (gameChar_y<floorPos_y){isFalling=true,gameChar_y+=1}
 else{isFalling=false;}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

    if (isLeft){gameChar_x -=speed}
    if (isRight){gameChar_x +=speed}

    //if character is within canyon, starts plummeting.
    if (gameChar_x>canyon.x_pos && gameChar_x<canyon.x_pos+canyon.width&&gameChar_y>=floorPos_y){isPlummeting=true;}
    if (isPlummeting){gameChar_y+=5}//starts descending very quickly
    if (gameChar_y>floorPos_y+100){reset()}//if character falls 100 pixels below floor level, reset.

}


function keyPressed()
{
    if (keyCode==37){isLeft=true;}//if left arrow pressed, move left.
    else if (keyCode==39){isRight=true;}//if arrow pressed, move right
    if (keyCode==38){gameChar_y-=100}//Press up arrow to jump
}

function keyReleased()
{
    if (keyCode==37){isLeft=false;}//When left arrow released, stop moving left
    else if (keyCode==39){isRight=false;}//When right arrow released, stop moving right
    if (keyCode==32&&collectable.isFound){shooting=true,console.log("SHOT")}//When spacebar released, shooting mode.
}
function reset() {
  collectable.isFound=false;
  shooting=false;
  isFound=false;
  peak=false;
  collectable={x_pos: random(0, width), y_pos: floorPos_y, size: 50, isFound: false,size2:30};
  collectable.y_pos-=collectable.size/2
  gameChar_x=random(0, width)
  gameChar_y=floorPos_y
  stroke(0,255,0)
  attempts+=1
  isPlummeting=false;
}
