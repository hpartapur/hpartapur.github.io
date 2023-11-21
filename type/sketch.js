var score = 0;
var playing=false;
var lives=3;

var huroof = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 
'ل', 'م', 'ن', 'و', 'ه', 'ي']
var a = new Audio("otl.mp3")
function setup() {
    createCanvas(1000, 600);
    if(playing){a.play()}
    a.loop=true;
    a.volume=1;
    textFont("Kanz-al-Marjaan")
    sizee=20;
    vert=50;
    z = new harf();
}

function draw() {
    background(180,180,250);
    stroke(255);
    strokeWeight(4);
    // line(400, 0,200, 600);
    // line(600, 0, 800, 600);

    // line(400,0,400,600)
    // line(600,0,600,600)
    strokeWeight(0);

    updateButtons()

    if(playing==false){
        textSize(50)
        text("Press space to begin", width/3, height/2)
    }
    if (playing==true){
    a.play()
    textSize(30)
    var heart="🤍"
    text("Score: " + score, 10, 30)
    lives_h = ""
    for (var i =0; i<lives; i++){lives_h+=heart}
    text("Lives: " + lives_h, width-300,30)



    z.show()
    if(z.y<=height){
        z.move()
    }else{
        lives--
        z = new harf();
    }

    if (lives<=0){
        a.pause();
        playing=false;
        score=0;
        lives=3;
    }
    }


}

// if(mouseX)
function keyPressed(){
    console.log(keyCode)
    if(key=="AudioVolumeMute"){playing=false}
    if (key == z.randomLetter && playing==true){
        score+=1;
        z = new harf();
        if (score%28==0){lives++}
    }
    if(key =! z.randomLetter && playing==true){
        score-=1
    }
    // if(playing==false&&keyCode==32){
    //     playing=true;
    //     a.play()
    //     a.loop=true;
    // }
}



class harf{
    constructor(){
        // this.x is random value between 0.2 and 0.8
        this.x = (Math.random() * 0.6 + 0.2)*width;
        // this.x=width*0.4;
        this.y=50;
        this.size=20;
        this.randomLetter = huroof[Math.floor(Math.random() * huroof.length)];
    }
    show(){
        // rect(this.x, this.y*0.7, this.size, this.size)
        // ellipse(this.x*1.04, this.y,this.size*1.75,this.size*1.75)
        textSize(this.size);
        fill(255*(z.y/height),0,0)
        text(this.randomLetter, this.x, this.y);
        fill(0);
    }
    move(){
        this.size=this.size*(1.02+(score/800));
        // this.y=this.y*1.02;
        this.y=this.y*(1.02+(score/800));
    }
}

function updateButtons(){
    if (a.volume==1){
        document.getElementById("muter").innerHTML="🔈"
    }else{document.getElementById("muter").innerHTML="🔊"}

    if(playing){document.getElementById("pauser").innerHTML="⏸"
    }else{document.getElementById("pauser").innerHTML="▶"}
}