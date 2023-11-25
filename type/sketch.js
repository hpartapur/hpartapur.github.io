let score = 0;
let playing=false;
let hinting=false;
let lives=3;
const huroof = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 
'ل', 'م', 'ن', 'و', 'ه', 'ي',"ء","ئ","ى","ة"]
const hints = {'ا':"h", 'ب':"f", 'ت':"j", 'ث':"e", 'ج':"[", 'ح':"p", 'خ':"o", 'د':"]", 'ذ':"`", 'ر':"v", 'ز':".", 'س':"s", 'ش':"a", 'ص':"w", 'ض':"q", 'ط':"'", 'ظ':"/",
 'ع':"u", 'غ':"y", 'ف':"t", 'ق':"r", 'ك':";",'ل':"g", 'م':"l", 'ن':"k", 'و':",", 'ه':"i", 'ي':"d","ء":"x","ئ":"z","ى":"n","ة":"m"}
var a = new Audio("otl.mp3")
let wrongfx = new Audio("wrong.mp3")
let rightfx = new Audio ("/asal_assets/points.mp3")
var highscore = getCookie("highscore");
if (highscore==undefined){highscore=0;}



function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight*0.7);
    canvas.parent("canvas-container")
    // alert("Type the arabic letters on the screen.\nDon't let the keys fall!\nSwitch to Arabic Keyboard before playing.\nThis game is still in development.")
    if(playing){a.play()}
    a.loop=true;
    a.volume=1;
    textFont("Kanz-al-Marjaan")
    z = new harf();
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
        console.log("wrong")
        wrongfx.play()
        z = new harf();
    }

    if(z.y>=height*0.5 && hinting==true){
        textSize(50)
        text("Press " + hints[z.randomLetter] + "!", width/2, height*0.3)
        console.log(hints[z.randomLetter])
    }


    if (lives<=0){
        GAevent()
        alert("You scored "+score+"\nHigh Score: "+highscore)
        if (score>highscore){document.cookie = "highscore="+score; alert("New highscore!")}
        a.pause();
        playing=false;
        score=0;
        lives=3;
    }
    }


}
function GAevent (){
    gtag('event', 'ًGame Played', {
        'event_label': 'Game Played',
        'event_category': 'Game Played',
        // 'non_interaction': true,
        'value':score
        });}
// if(mouseX)
function keyPressed(){
    console.log(keyCode)
    if ((key == z.randomLetter || key==hints[z.randomLetter]) && playing==true){
        rightfx.play()
        score+=1;
        z = new harf();
        if (score%28==0){lives++}
    }
}



class harf{
    constructor(){
        // this.x is random value between 0.2 and 0.8
        this.x = (Math.random() * 0.6 + 0.2)*width;
        this.y=height*0.05;
        this.size=height*0.03;
        this.randomLetter = huroof[Math.floor(Math.random() * huroof.length)];
    }
    show(){
        // rect(this.x, this.y, this.size, this.size)
        // ellipse(this.x*1.04, this.y,this.size*1.75,this.size*1.75)
        textSize(this.size);
        fill(500*(z.y/height),0,0)
        text(this.randomLetter, this.x, this.y);
        fill(0);
    }
    move(){
        this.size=this.size*(1.01+(score/1500));
        this.y=this.y*(1.01+(score/1500));
        // Get all the buttons with class "key"
        var keys = document.getElementsByClassName("key");
        // Loop through all the buttons
        for (var i = 0; i < keys.length; i++) {
        // If the button's innerHTML is equal to the random letter
        if (keys[i].innerHTML == this.randomLetter) {
            // Change the button's color to red
            keys[i].style.backgroundColor = "red";
        }else{
            keys[i].style.backgroundColor = "DarkGray";}
        }
    }
}

function updateButtons(){
    if (a.volume==1){
        document.getElementById("muter").innerHTML="🔈"
    }else{document.getElementById("muter").innerHTML="🔊"}

    // if(playing){document.getElementById("pauser").innerHTML="⏸"
    // }else{document.getElementById("pauser").innerHTML="▶"}
}

