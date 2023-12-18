let score = 0;
let playing=false;
let hinting=false;
let lives=3;
const huroof = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 
'ل', 'م', 'ن', 'و', 'ه', 'ي',"ء","ئ","ى","ة"]
const hints = {'ا':"h", 'ب':"f", 'ت':"j", 'ث':"e", 'ج':"[", 'ح':"p", 'خ':"o", 'د':"]", 'ذ':"`", 'ر':"v", 'ز':".", 'س':"s", 'ش':"a", 'ص':"w", 'ض':"q", 'ط':"'", 'ظ':"/",
 'ع':"u", 'غ':"y", 'ف':"t", 'ق':"r", 'ك':";",'ل':"g", 'م':"l", 'ن':"k", 'و':",", 'ه':"i", 'ي':"d","ء":"x","ئ":"z","ى":"n","ة":"m"}
var bgMusic = new Audio("otl.mp3")
bgMusic = new Audio ("gwen.mp3")
let wrongfx = new Audio("/asal_assets/wrong.mp3")
let rightfx = new Audio ("/asal_assets/points.mp3")
var highscore = getCookie("highscore");
if (highscore==undefined){highscore=0;}
var times =[]
var lettercount = 0
var averages = []
var sum = 0;
var average =0;




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
    
    // background("#F1C688")

    stroke(255);
    strokeWeight(0);

    updateButtons()

    if(playing==false){
        textSize(50)
        textFont("Audiowide")
        text("Press space to begin", width/3, height/2)
        textFont("Kanz-al-Marjaan")
    }
    if (playing==true){
    bgMusic.play()
    textSize(30)
    textFont("Audiowide")
    var heart="💛"
    text("Score: " + score, 10, 30)
    lives_h = ""
    for (var i=0; i<lives; i++){lives_h+=heart}
    text("Lives: " + lives_h, width-300,30)
    textFont("Kanz-al-Marjaan")


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
        writeSessionData()
		updateHighscore()
        // TODO: replace alert with modals
        document.getElementById('gameovermodal').style.display='block'
        document.getElementById('gameoverbody').innerText="You scored "+score+"\nHigh Score: "+highscore + "\nAverage Typing Speed: " + (sum/averages.length).toFixed(3) + " seconds per Letter\n" + (60(sum/averages.length)).toFixed(3)+" Letters per Minute"
        if (score>highscore){
            highscore=score;
            updateHighscore();
            document.cookie = "highscore="+highscore;
            document.getElementById('gameoverbody').innerText+="\nNew highscore!";
			document.getElementById('gameoverbody').style.color="green";
			setTimeout(() => {document.getElementById("document.getElementById('settingsmodal').style.display='block'")}, 5253);
        }
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
		if (score>50){document.getElementById('keyboard').hidden='true'}
    }
}



class Harf{
    constructor(){
        
        // this.x is random value between 0.2 and 0.8
        this.x = (Math.random() * 0.6 + 0.2)*width;
        this.y=height*0.05;
        this.size=height*0.03;
        this.randomLetter = huroof[Math.floor(Math.random() * huroof.length)];
		if (playing){
			this.starttime = new Date()
			times.push(this.starttime)
			console.log(times[times.length-1] - times[times.length-2])
			averages.push((times[times.length-1] - times[times.length-2])/1000)
			if (isNaN(averages[0])){averages.splice(0,1)}
			sum=0
			for (let i = 0; i < averages.length; i++ ) {
				sum += averages[i];
			}
			average = 60/(sum/averages.length)
			console.log(average+"Letters per Minute")
		}

    }
    draw(){
        // rect(this.x, this.y, this.size, this.size)
		// strokeWeight(10)
		// stroke(10,10,255)
        // ellipse(this.x, this.y,this.size*1.75,this.size*1.75)
        textSize(this.size);
        fill(500*(harf.y/height),0,0)
        text(this.randomLetter, this.x, this.y);
        fill(0);
    }
    move(){
        this.size=this.size*(1.02+(score/2000));
        this.y=this.y*(1.02+(score/2000));

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
        document.getElementById("hinter").innerHTML="Hints On";
        document.getElementById("hinter").style.textDecoration="none"
    }else{
        document.getElementById("hinter").innerHTML="Hints Off";
        document.getElementById("hinter").style.textDecoration="line-through"
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

// CONFETTI FILE
var confetti = {
	maxCount: 150,		//set max confetti count
	speed: 2,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};

(function() {
	confetti.start = startConfetti;
	confetti.stop = stopConfetti;
	confetti.toggle = toggleConfetti;
	confetti.pause = pauseConfetti;
	confetti.resume = resumeConfetti;
	confetti.togglePause = toggleConfettiPause;
	confetti.isPaused = isConfettiPaused;
	confetti.remove = removeConfetti;
	confetti.isRunning = isConfettiRunning;
	var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
	var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
	var streamingConfetti = false;
	var animationTimer = null;
	var pause = false;
	var lastFrameTime = Date.now();
	var particles = [];
	var waveAngle = 0;
	var context = null;

	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = Math.random() * Math.PI;
		return particle;
	}

	function toggleConfettiPause() {
		if (pause)
			resumeConfetti();
		else
			pauseConfetti();
	}

	function isConfettiPaused() {
		return pause;
	}

	function pauseConfetti() {
		pause = true;
	}

	function resumeConfetti() {
		pause = false;
		runAnimation();
	}

	function runAnimation() {
		if (pause)
			return;
		else if (particles.length === 0) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			animationTimer = null;
		} else {
			var now = Date.now();
			var delta = now - lastFrameTime;
			if (!supportsAnimationFrame || delta > confetti.frameInterval) {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				updateParticles();
				drawParticles(context);
				lastFrameTime = now - (delta % confetti.frameInterval);
			}
			animationTimer = requestAnimationFrame(runAnimation);
		}
	}

	function startConfetti(timeout, min, max) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, confetti.frameInterval);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
			document.body.prepend(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
			context = canvas.getContext("2d");
		} else if (context === null)
			context = canvas.getContext("2d");
		var count = confetti.maxCount;
		if (min) {
			if (max) {
				if (min == max)
					count = particles.length + max;
				else {
					if (min > max) {
						var temp = min;
						min = max;
						max = temp;
					}
					count = particles.length + ((Math.random() * (max - min) + min) | 0);
				}
			} else
				count = particles.length + min;
		} else if (max)
			count = particles.length + max;
		while (particles.length < count)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		pause = false;
		runAnimation();
		if (timeout) {
			window.setTimeout(stopConfetti, timeout);
		}
	}

	function stopConfetti() {
		streamingConfetti = false;
	}

	function removeConfetti() {
		stop();
		pause = false;
		particles = [];
	}

	function toggleConfetti() {
		if (streamingConfetti)
			stopConfetti();
		else
			startConfetti();
	}
	
	function isConfettiRunning() {
		return streamingConfetti;
	}

	function drawParticles(context) {
		var particle;
		var x, y, x2, y2;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			x2 = particle.x + particle.tilt;
			x = x2 + particle.diameter / 2;
			y2 = particle.y + particle.tilt + particle.diameter / 2;
			if (confetti.gradient) {
				var gradient = context.createLinearGradient(x, particle.y, x2, y2);
				gradient.addColorStop("0", particle.color);
				gradient.addColorStop("1.0", particle.color2);
				context.strokeStyle = gradient;
			} else
				context.strokeStyle = particle.color;
			context.moveTo(x, particle.y);
			context.lineTo(x2, y2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle) - 0.5;
				particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= confetti.maxCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();
