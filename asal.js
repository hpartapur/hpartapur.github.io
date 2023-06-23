var validWords=[];
var letters = "";
var discoveredWords =[];
var totalScore = 0;
var pangram = "";
var centerLetter = "";
var cursor = true;
var numFound = 0;
var maxscore = 7;
setInterval(() => { //toggle cursor every 600ms 
  if(cursor) { 
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  }else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, 600);


function get_valid_words(){
  fetch('./words.json')
  .then((response) => response.json())
  .then((json) => {
    data2 = json;  // Assign the parsed JSON data to the global variable data2
    console.log(data2); // Log the data2 variable to the console
    var random = Math.round(Math.random() * (data2["words"].length-1  - 0 ) +0)
    console.log(data2["words"][random])
    letters=data2["words"][random]["letters"]
    validWords=data2["words"][random]["validWords"]
    initialize_letters();
    console.log(validWords)
    console.log(letters)
  });
}


//gives maxscore value to html page
// function initialize_score(){
//   document.getElementById("maxscore").innerHTML = String(maxscore); 
// }

//Creates the hexagon grid of 7 letters with middle letter as special color
function initialize_letters(){
    
    var hexgrid = document.getElementById('hexGrid')
    for(var i=0; i<letters.length; i++){
        var char = letters[i];
        
        var pElement = document.createElement("P");
        pElement.innerHTML = char;
        
        var aElement = document.createElement("A");
        aElement.className = "hexLink";
        aElement.href = "#";
        aElement.appendChild(pElement);
        aElement.addEventListener('click', clickLetter(char), false);
        aElement.addEventListener('click', handleButtonClick);
        function handleButtonClick(event){
          event.preventDefault();
        }


        var divElement = document.createElement('DIV');
        divElement.className = "hexIn"; 
        divElement.appendChild(aElement);
        
        var hexElement = document.createElement("LI");
        hexElement.className = "hex";
        hexElement.appendChild(divElement);
        if(i==3){
          aElement.id = "center-letter";
          centerLetter = letters[i];
        }
        hexgrid.appendChild(hexElement);
    }
}


//Shuffles the letters and makes sure the center letter is in the middle
function shuffleLetters() {
    letters.shuffle()
    //get center letter back to letter[3]
    var centerIndex = letters.indexOf(centerLetter);
    if(letters[3] != centerLetter) {
        var temp = letters[3];
        letters[3] = centerLetter;
        letters[centerIndex] = temp;
    }
    var hexgrid = document.getElementById('hexGrid')
    while (hexgrid.firstChild) {
      hexgrid.removeChild(hexgrid.firstChild);
    }
    initialize_letters()
}
//shuffle function dependency
Array.prototype.shuffle = function() {
  let input = this;
  for (let i = input.length-1; i >=0; i--) {
    let randomIndex = Math.floor(Math.random()*(i+1)); 
    let itemAtIndex = input[randomIndex]; 
    input[randomIndex] = input[i]; 
    input[i] = itemAtIndex;
  }
  return input;
}


//When letter is clicked add it to input box
var clickLetter = function(letter){
  return function curried_func(e){
    var tryword = document.getElementById("testword");
    tryword.innerHTML = tryword.innerHTML + letter;

    lettersound = new sound("/huroofs/"+letter+".wav");
    lettersound.play();
  }
}

//Deletes the last letter of the string in the textbox
function deleteLetter(){
  var tryword = document.getElementById("testword");
  var trywordTrimmed = tryword.innerHTML.substring(0, tryword.innerHTML.length-1);
  tryword.innerHTML = trywordTrimmed
  if(!checkIncorrectLetters(trywordTrimmed)) {
      tryword.style.color = 'black';
  }
}

//if input is invalid, fades out and shakes the input box and clears the input
function wrongInput(selector){
  wrong.play();
  $(selector).fadeIn(1000);
  $("#bee2").fadeIn(1000).fadeOut(500);
  $(selector).fadeOut(500);
  $("#cursor").hide();
  $( "#testword" ).effect("shake", {times:2.5}, 450, function(){
      clearInput(); //TODO if you want to not remove guess, comment this line
      $("#cursor").show();
    
    } );
    

}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
point = new sound("/asal_assets/points.mp3");
wrong = new sound("/asal_assets/wrong.mp3");

//word fades in and then out
function rightInput(selector){
  $(selector).fadeIn(1500).delay(700).fadeOut(1500);
  $("#bee").fadeIn(1500).delay(700).fadeOut(1500);
  point.play();
  clearInput();
}

//clears letters entered
function clearInput(){
  $("#testword").empty();
}

//points won popup
function showPoints(pts){ 
  $(".points").html("+" + pts);
}

//check if the word is valid and clear the input box
//word must be at least 4 letters
//word must contain center letter
//word can't already be found 
function submitWord(){
  var tryword = document.getElementById('testword');
  var centerLetter = document.getElementById('center-letter').firstChild.innerHTML;
  let score = 0;
  var isPangram = false;

  //Check that word is not too short, already found, or missing center letter
  if(tryword.innerHTML.length < 1){ 
    wrongInput("#too-short");
  }else if(discoveredWords.includes(tryword.innerHTML.toLowerCase())){
    wrongInput("#already-found");
  }else if(!tryword.innerHTML.toLowerCase().includes(centerLetter.toLowerCase())){
    wrongInput("#miss-center");

  //if word is valid, and in word list
  }else if(validWords.includes(tryword.innerHTML.toLowerCase())){

    var isPangram = checkPangram(tryword.innerHTML);
    score = calculateWordScore(tryword.innerHTML, isPangram);
    addToTotalScore(score);
    console.log("totalscore: " + totalScore);
    
    showDiscoveredWord(tryword.innerHTML);
    numFound++;
    document.getElementById("numfound").innerHTML = numFound;
    document.getElementById("score").innerHTML = totalScore;

    //Scoring System
    //TODO: Change scoring system by length and points
    var wordlength = tryword.innerHTML.length;
    if(isPangram){
      rightInput("#pangram");
      // showPoints(17);
    }else if(wordlength < 5){
      rightInput("#good");
      // showPoints(1);
    }else if(wordlength<7){
      rightInput("#great");
      // showPoints(wordlength);
    }else{
      rightInput("#amazing");
      // showPoints(l);
    }
    showPoints(score)
  }else{
    wrongInput("#invalid-word");
  }


}

//if word was valid, display it below the grid
//if all words are found end game.
function showDiscoveredWord(input){
    
    var discText = document.getElementById("discoveredText");
    discoveredWords.push(input);
    discoveredWords.sort() //add new word to discovered list and sort alphabetically
    while(discText.firstChild){
      discText.removeChild(discText.firstChild);
    }
    var numFound = discoveredWords.length; 

    var numCol = Math.ceil(numFound/6); //how many columns for the discoveredwords
    var w = 0; 
    for(var c=0; c<numCol; c++){
      var list = document.createElement("UL");
      list.id= "discovered-words"+c;
      discText.appendChild(list);
      var n = 6; 
      if(c == numCol-1){
        if(numFound%6 ==0){
          if(numFound==0){
            n = 0
          }
          else{
            n=6;
          }
        }else{
        n = numFound%6;}
      }
      for(var i=0; i<n; i++){
        var listword = document.createElement("LI");
        var pword = document.createElement("P");
        pword.innerHTML = discoveredWords[w]; 
        listword.appendChild(pword);
        list.appendChild(listword);
        w++;
      }
    }

     /* TODO: if score reaches a certain amount, modal should pop up
     modal should say, you have won. press here to try to find more words and achieve a high score
      */
    if (numFound>=5){
      gtag('event', 'ًWin', {
        'event_label': "rightGuessString",
        'event_category': 'Win',
        'non_interaction': true,
        'value':discoveredWords
        });
        
        // create a list element of all validwords
        var list = document.createElement("UL");
        list.id= "discovered-words";
        discText.appendChild(list);
        for(var i=0; i<validWords.length; i++){
          var listword = document.createElement("LI");
          var pword = document.createElement("P");
          pword.innerHTML = validWords[i];
          listword.appendChild(pword);
          list.appendChild(listword);
        }
        // make Modal Body 2 the list of all valid words
        document.getElementById("Modal Body 2").innerHTML = `List of all valid words:`
        document.getElementById("Modal Body 2").appendChild(list);

      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      document.getElementById("Modal Header").innerHTML = "You win!"
			document.getElementById("Modal Body 1").innerHTML =  
      `<button type="button" class="button" style="font-size:1em; background-color:goldenrod; width:100%">
      <a href=""><i class="material-icons" style="color:white;font-size:1.21em">autorenew</i>
      Play Again</a>
      </button>

      <button type="button" class="button" style="font-size:1em; background-color:forestgreen;">
      <a href="whatsapp://send?text=I scored ${totalScore} on today's 🍯Asal🍯 https://khardal.net/asal.html">
      <i class="fa fa-whatsapp" style="color:white;font-size:1.21em"></i>
      Share to Whatsapp</a>
      </button>`;
      // document.getElementById("Modal Body 2").innerHTML = 
			document.getElementById("ModalHeaderDiv").style.backgroundColor="forestgreen"
			document.getElementById("ModalFooterDiv").style.backgroundColor="forestgreen"
    }
}

//adds input "score" to the total score of user
function addToTotalScore(score) {
  totalScore += score;
}

//calculates the score of input "input" and also adjusts if "input" is a pangram 
function calculateWordScore(input, isPangram) {
  
  let len = input.length;
  let returnScore = 1; 
  if(isPangram) {
    returnScore = len + 27; //plus pangram bonus
  }else{
    returnScore = len;
  }
  console.log('score ' + returnScore)
  return returnScore;
}

//checks if "input" word is a pangram
function checkPangram(input) {
  var i;
  var containsCount = 0;
  var containsAllLetters = false;
  for(i = 0; i < 7; i++) {
    if(input.includes(letters[i])) {
      containsCount++;
    }
  }
  if(containsCount == 7) {
    containsAllLetters = true;
  }
  console.log("isPangram?: " + containsAllLetters);
  return containsAllLetters;
}

//checks if "input" contains any letters that are not in the hexagon
function checkIncorrectLetters(input) {
  var tryword = document.getElementById("testword");
  tryword=tryword.innerHTML;
  console.log(tryword)
  for (i=0; i<tryword.length;i++){
    if (!letters.includes(tryword[i])){
      

      return true;
      
    }
  }
  return false;
}


//takes keyboard event from user and determines what should be done
function input_from_keyboard(event) {
  var tryword = document.getElementById("testword");

  if(event.keyCode == 13) {
    submitWord();
  }

  if(event.keyCode == 8) {
    deleteLetter();
  }


  
  // //validation for just alphabet letters input
  if(event.keyCode >= 97 && event.keyCode <= 122 ||
    event.keyCode >=65 && event.keyCode <=90) {
    if(checkIncorrectLetters(tryword.innerHTML)) {
      tryword.style.color = 'grey';
    }
  }
    

}


 // Get the modal
 var modal = document.getElementById("myModal");
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];//close modal when x clicked
 span.onclick = function() {
   modal.style.display = "none";
//     firsthint()
 }
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
//    firsthint()
   }
 }