let score = 0;
let playing=false;
let hinting=false;
let lives=3;
const huroof = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 
'ل', 'م', 'ن', 'و', 'ه', 'ي',"ء","ئ","ى","ة"]
const hints = {'ا':"h", 'ب':"f", 'ت':"j", 'ث':"e", 'ج':"[", 'ح':"p", 'خ':"o", 'د':"]", 'ذ':"`", 'ر':"v", 'ز':".", 'س':"s", 'ش':"a", 'ص':"w", 'ض':"q", 'ط':"'", 'ظ':"/",
 'ع':"u", 'غ':"y", 'ف':"t", 'ق':"r", 'ك':";",'ل':"g", 'م':"l", 'ن':"k", 'و':",", 'ه':"i", 'ي':"d","ء":"x","ئ":"z","ى":"n","ة":"m"}
var bgMusic = new Audio("otl.mp3")
let wrongfx = new Audio("/asal_assets/wrong.mp3")
let rightfx = new Audio ("/asal_assets/points.mp3")
var highscore = getCookie("highscore");
if (highscore==undefined){highscore=0;}





function setup() {
    var canvas = createCanvas(windowWidth, windowHeight*0.7);
    canvas.parent("canvas-container")
    if(playing){bgMusic.play()}
    bgMusic.loop=true;
    bgMusic.volume=1;
    textFont("Kanz-al-Marjaan")
    harf = new Harf();
}

function draw() {
    background("#A7C7E7")
    stroke(255);
    strokeWeight(0);

    updateButtons()

    if(playing==false){
        textSize(50)
        text("Press space to begin", width/3, height/2)
    }
    if (playing==true){
    bgMusic.play()
    textSize(30)
    var heart="💛"
    text("Score: " + score, 10, 30)
    lives_h = ""
    for (var i=0; i<lives; i++){lives_h+=heart}
    text("Lives: " + lives_h, width-300,30)



    harf.draw()

    //TODO: move following code to harf.draw()
    if(harf.y <= height){ //if harf has not reached the bottom of the screen
        harf.move() //move harf down and grow
    }else{
        lives--
        console.log("wrong")
        wrongfx.play()
        harf = new Harf();
    }

    if(harf.y >= height*0.5 && hinting==true){
        textSize(50)
        text("Press " + hints[harf.randomLetter] + "!", width/2, height*0.3)
        console.log(hints[harf.randomLetter])
    }


    if (lives<=0){
        GAevent()
        writeUserData(score, harf.randomLetter)
        // TODO: replace alert with modals
        alert("You scored "+score+"\nHigh Score: "+highscore)
        if (score>highscore){document.cookie = "highscore="+score; alert("New highscore!")}
        bgMusic.pause();
        playing=false;
        score=0;
        lives=3;
    }
    }


}


function keyPressed(){
    if ((key == harf.randomLetter || key==hints[harf.randomLetter]) && playing==true){
        rightfx.play()
        score+=1;
        harf = new Harf();
        if (score%28==0){lives++}
    }
}



class Harf{
    constructor(){
        // this.x is random value between 0.2 and 0.8
        this.x = (Math.random() * 0.6 + 0.2)*width;
        this.y=height*0.05;
        this.size=height*0.03;
        this.randomLetter = huroof[Math.floor(Math.random() * huroof.length)];
    }
    draw(){
        // rect(this.x, this.y, this.size, this.size)
        // ellipse(this.x*1.04, this.y,this.size*1.75,this.size*1.75)
        textSize(this.size);
        fill(500*(harf.y/height),0,0)
        text(this.randomLetter, this.x, this.y);
        fill(0);
    }
    move(){
        this.size=this.size*(1.01+(score/1500));
        this.y=this.y*(1.01+(score/1500));

        // TODO: move below code to draw()
        // Get all the buttons with class "key"
        var keys = document.getElementsByClassName("key");
        // Loop through all the buttons
        for (var i = 0; i < keys.length; i++) {
        // If the button's innerHTML is equal to the random letter
        if (keys[i].innerHTML == this.randomLetter) {
            // Change the button's color to red
            keys[i].style.backgroundColor = "red";
        }else{
            keys[i].style.backgroundColor = "buttonface";}
        }
    }
}

function updateButtons(){
    if (bgMusic.volume==1){
        document.getElementById("muter").innerHTML="🎵🔊"
    }else{document.getElementById("muter").innerHTML="🎵🔇"}

    if (rightfx.volume==1 || wrongfx.volume==1){
        document.getElementById("fxmuter").innerHTML="FX🔊"
    }else if (rightfx.volume==0 || wrongfx.volume==0){
        document.getElementById("fxmuter").innerHTML="FX🔕"
    }

    if(hinting){
        document.getElementById("hinter").innerHTML="Hints Off";
        document.getElementById("hinter").style.textDecoration="line-through"
    }else{
        document.getElementById("hinter").innerHTML="Hints On";
        document.getElementById("hinter").style.textDecoration="none"
    }

    if(playing){document.getElementById("pauser").innerHTML="⏸"
    }else{document.getElementById("pauser").innerHTML="▶"}
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function GAevent (){
    gtag('event', 'ًGame Played', {
        'event_label': 'Game Played',
        'event_category': 'Game Played',
        // 'non_interaction': true,
        'value':score
});}
//TODO: create settings class-incorporate all button functions, updatebuttons, and settings variables
function pauseButton(){
    if(playing){
      playing=false;
    }else{
      playing=true;
    }
}
function muteButton(){
    if (bgMusic.volume==1){
        bgMusic.volume=0
    }else if (bgMusic.volume==0){
        bgMusic.volume = 1
    }
}
function fxmuteButton(){
    if (rightfx.volume==1 || wrongfx.volume==1){
        rightfx.volume=0
        wrongfx.volume=0
    }else if (rightfx.volume==0 || wrongfx.volume==0){
        rightfx.volume=1
        wrongfx.volume=1
    }
}
function hintsButton(){
  if(hinting){hinting=false;}else{hinting=true;}
}

