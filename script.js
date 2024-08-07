// بسم الله الرحمن الرحيم
import { WORDS1, WORDSDEF } from "./archives/dailywordlists/day1.js";
import { HUROOF } from "./huroof.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	set,
	get,
	update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyCooPWsrh3yFb4eat6dg2_VFAIIPF_ET50",
	authDomain: "khardal.firebaseapp.com",
	projectId: "khardal",
	storageBucket: "khardal.appspot.com",
	messagingSenderId: "258618544710",
	appId: "1:258618544710:web:2b734571b863de60dc3047",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.database = getDatabase(app);

function glogin() {
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
}
window.glogin = glogin;

const provider = new GoogleAuthProvider();
window.signInWithPopup = signInWithPopup;
window.provider = provider;
window.auth = auth;

auth.onAuthStateChanged(function (user) {
	if (user) {
		window.user = user;
		console.log(user);
		pullData();
		const dbRef = ref(database);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data["users"]);
			if (!data["users"][user.uid]) {
				set(ref(database, "users/" + user.uid), {
					name: user.displayName,
					email: user.email,
					highscore: 0,
					totalscore: 0,
					dateJoined: new Date(),
				});
			}
		});
		document.getElementById("loginmodal").style.display = "none";
	} else {
		window.user = null;
		document.getElementById("loginmodal").style.display = "block";
	}
});

function signout() {
	auth.signOut();
}
window.signout = signout;
function pullData() {
	const dbRef = ref(database);
	onValue(dbRef, (snapshot) => {
		const data = snapshot.val();
		console.log(data["users"]);
		window.data = data;
		// user.highscore = data["users"][user.uid].highscore;
		// user.gender = data["users"][user.uid].gender;
		// if (user != undefined && user.gender == undefined) {
		// 	document.getElementById("gendermodal").style.display = "block";
		// }
	});
}

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; //array of letters guessed
let nextLetter = 0;
let rightGuessString = WORDS1[Math.floor(Math.random() * WORDS1.length)]; //Selects random word from words list.
var score_n = 0;
var hintarray = [];
var scoreboard = ``;
var scoreboardl = ``;
var greenbox = "🟩";
var yellowbox = "🟨";
var greybox = "⬜";

//Outputs correct word to console
console.log(rightGuessString);

//Get parameters from URL
const queryString = window.location.search; //get url parameters
const urlParams = new URLSearchParams(queryString);
if (urlParams.has("score")) {
	score_n = Number(urlParams.get("score"));
	document.getElementById("score").innerHTML = "Score: " + +score_n;
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]; //close modal when x clicked
span.onclick = function () {
	modal.style.display = "none";
	// firsthint();  UNCOMMENT THIS AND BELOW
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		// firsthint(); UNCOMMENT THIS AND ABOVE
	}
};

function initBoard() {
	let board = document.getElementById("game-board"); //assigns "gameboard" in html to board variable
	for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
		let row = document.createElement("div");
		row.className = "letter-row";
		//for every guess allowed, add a row to the gameboard

		for (let j = 0; j < rightGuessString.length; j++) {
			let box = document.createElement("div");
			box.className = "letter-box";
			row.appendChild(box); //for every letter in a word, add a box to the row
		}
		board.appendChild(row);
	}
}

function shadeKeyBoard(letter, color) {
	for (const elem of document.getElementsByClassName("keyboard-button")) {
		if (elem.textContent === letter) {
			let oldColor = elem.style.backgroundColor;
			if (oldColor === "green") {
				return;
			}

			if (oldColor === "yellow" && color !== "green") {
				return;
			}

			elem.style.backgroundColor = color;
			break;
		}
	}
}

function deleteLetter() {
	let row =
		document.getElementsByClassName("letter-row")[
			NUMBER_OF_GUESSES - guessesRemaining
		];
	let box = row.children[nextLetter - 1];
	box.textContent = "";
	box.classList.remove("filled-box");
	currentGuess.pop();
	nextLetter -= 1;
}

function checkGuess() {
	let row =
		document.getElementsByClassName("letter-row")[
			NUMBER_OF_GUESSES - guessesRemaining
		];
	let guessString = "";
	let rightGuess = Array.from(rightGuessString);
	console.log(rightGuess);

	for (const val of currentGuess) {
		guessString += val;
	}

	if (guessString.length != rightGuessString.length) {
		modalgenerator("tooshort");
		return;
	}

	//    if (!WORDS.includes(guessString)) {
	//        toastr.error("Word not in list!")
	//        return
	//    }
	//Needs to be readded once words list is complete

	for (let i = 0; i < rightGuessString.length; i++) {
		let letterColor = "";
		let box = row.children[i];
		let letter = currentGuess[i];

		let letterPosition = rightGuess.indexOf(currentGuess[i]);
		// is letter in the correct guess
		if (letterPosition === -1) {
			letterColor = "grey";
			scoreboardl = scoreboardl.concat(greybox);
		} else {
			// now, letter is definitely in word
			// if letter index and right guess index are the same
			// letter is in the right position
			if (currentGuess[i] === rightGuess[i]) {
				// shade green
				letterColor = "green";
				scoreboardl = scoreboardl.concat(greenbox);
				score_n += 2;
			} else {
				// shade box yellow
				letterColor = "yellow";
				scoreboardl = scoreboardl.concat(yellowbox);
			}

			rightGuess[letterPosition] = "#";
		}

		let delay = 250 * i;
		setTimeout(() => {
			//flip box
			animateCSS(box, "flipInX");
			//shade box
			box.style.backgroundColor = letterColor;
			shadeKeyBoard(letter, letterColor);
		}, delay);
		document.getElementById("score").innerHTML = "Score: " + score_n;

		gtag("event", "ًWord Tried", {
			event_label: guessString,
			event_category: "Word Guessed",
			non_interaction: true,
		});
	}
	var guessesref = ref(database, "/guesses");
	push(guessesref, {
		uid: user.uid,
		name: user.displayName,
		word: rightGuessString,
		guess: guessString,
		date: new Date().toDateString(),
		timestamp: new Date().toISOString(),
	});

	scoreboardl = scoreboardl.concat("%0a");
	scoreboard = scoreboard.concat(scoreboardl);
	scoreboardl = ``;

	if (guessString === rightGuessString) {
		score_n += rightGuessString.length * 2;
		score_n += rightGuessString.length * guessesRemaining;
		document.getElementById("score").innerHTML = "Score: " + score_n;
		guessesRemaining = 0;

		modalgenerator("youwin");

		gtag("event", "ًCorrect Word", {
			event_label: guessString,
			event_category: "Word Guessed",
			non_interaction: true,
			value: score_n,
		});
		var gamesref = ref(database, "/games");
		push(gamesref, {
			uid: user.uid,
			name: user.displayName,
			word: rightGuessString,
			score: score_n,
			result: "win",
			date: new Date().toDateString(),
			timestamp: new Date().toISOString(),
		});

		return;
	} else {
		guessesRemaining -= 1;
		currentGuess = [];
		nextLetter = 0;

		if (guessesRemaining == 1) {
			modalgenerator("lasttry");
		}

		if (guessesRemaining === 0) {
			modalgenerator("youlose");

			gtag("event", "ًFailed Word", {
				event_label: rightGuessString,
				event_category: "Word Failed",
				non_interaction: true,
				value: score_n,
			});
			var gamesref = ref(database, "/games");
			push(gamesref, {
				uid: user.uid,
				name: user.displayName,
				word: rightGuessString,
				score: score_n,
				result: "loss",
				date: new Date().toDateString(),
				timestamp: new Date().toISOString(),
			});
		}
	}
}

function buttonize() {
	document.getElementById("refresh").style.padding = "14px 25px";
	document.getElementById("refresh").style.backgroundColor = "limegreen";
	document.getElementById("refresh").style.display = "inline-block";
	document.getElementById("whatsappshare").style.padding = "14px 25px";
	document.getElementById("whatsappshare").style.backgroundColor =
		"limegreen";
	document.getElementById("whatsappshare").style.display = "inline-block";
}

function insertLetter(pressedKey) {
	if (nextLetter === rightGuessString.length) {
		return;
	}
	pressedKey = pressedKey.toLowerCase();

	let row =
		document.getElementsByClassName("letter-row")[6 - guessesRemaining];
	let box = row.children[nextLetter];
	animateCSS(box, "pulse");
	box.textContent = pressedKey;
	box.classList.add("filled-box");
	currentGuess.push(pressedKey);
	nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>
	// We create a Promise and return it
	new Promise((resolve, reject) => {
		const animationName = `${prefix}${animation}`;
		// const node = document.querySelector(element);
		const node = element;
		node.style.setProperty("--animate-duration", "0.3s");

		node.classList.add(`${prefix}animated`, animationName);

		// When the animation ends, we clean the classes and resolve the Promise
		function handleAnimationEnd(event) {
			event.stopPropagation();
			node.classList.remove(`${prefix}animated`, animationName);
			resolve("Animation ended");
		}

		node.addEventListener("animationend", handleAnimationEnd, {
			once: true,
		});
	});

document.addEventListener("keyup", (e) => {
	if (guessesRemaining === 0) {
		return;
	}

	let pressedKey = String(e.key);
	if (pressedKey === "Backspace" && nextLetter !== 0) {
		deleteLetter();
		return;
	}

	if (pressedKey === "Enter") {
		checkGuess();
		return;
	}

	var found = HUROOF.indexOf(pressedKey);
	if (found != -1) {
		insertLetter(pressedKey);
	} else {
		return;
	}
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
	const target = e.target;

	if (!target.classList.contains("keyboard-button")) {
		return;
	}
	let key = target.textContent;

	if (key === "Del") {
		key = "Backspace";
	}

	document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

initBoard();
modal.style.display = "block";

document.getElementById("hint").addEventListener("click", (e) => {
	//if "hint" button is clicked
	if (hintarray.length == 0) {
		hintarray = Array.from(rightGuessString);
	}
	gtag("event", "Hint Used", {
		event_label: rightGuessString,
		event_category: "hint category",
		non_interaction: true,
	});
	var n = Math.floor(Math.random() * hintarray.length);
	var l = hintarray.splice(n, 1);
	console.log(l);
	//assign n to a random letter in the rightguesstring
	score_n -= 2;
	//deduct score by 2 for using a hint
	document.getElementById("score").innerHTML = "Score: " + score_n;
	//update new score in HTML

	modal.style.display = "block";
	document.getElementById("Modal Header").innerHTML = "Pssst...";
	document.getElementById(
		"Modal Body 1"
	).innerHTML = `"${l}" :This word contains the letter `;
	document.getElementById(
		"Modal Body 2"
	).innerHTML = `${WORDSDEF[rightGuessString]} <br>:This word means `;
	document.getElementById(
		"Modal Body 2"
	).innerHTML = `:This word means<br>${WORDSDEF[rightGuessString]}`;
	document.getElementById(
		"Modal Footer"
	).innerHTML = `! Each hint deducts 2 points<br>! Don't lose too many`;
	document.getElementById("ModalHeaderDiv").style.backgroundColor =
		"dodgerblue";
	document.getElementById("ModalFooterDiv").style.backgroundColor =
		"dodgerblue";
});
function firsthint() {
	if (
		document.getElementById("Modal Footer").innerHTML ==
			"Brought to you by Kawakib Creations" &&
		modal.style.display != "block"
	) {
		setTimeout(() => {
			modal.style.display = "block";
		}, 1000);
		document.getElementById("Modal Header").innerHTML = "Pssst...";
		document.getElementById("Modal Body 1").innerHTML = `This word means`;
		document.getElementById(
			"Modal Body 2"
		).innerHTML = `${WORDSDEF[rightGuessString]}`;
		document.getElementById(
			"Modal Footer"
		).innerHTML = `!Use this hint to find the correct word`;
		document.getElementById("ModalHeaderDiv").style.backgroundColor =
			"dodgerblue";
		document.getElementById("ModalFooterDiv").style.backgroundColor =
			"dodgerblue";
	}
}
function modalgenerator(category) {
	if (category == "firsthint") {
		document.getElementById("Modal Header").innerHTML = "Pssst...";
		document.getElementById("Modal Body 1").innerHTML = `This word means`;
		document.getElementById(
			"Modal Body 2"
		).innerHTML = `${WORDSDEF[rightGuessString]}`;
		document.getElementById(
			"Modal Footer"
		).innerHTML = `!Use this hint to find the correct word`;
		document.getElementById("ModalHeaderDiv").style.backgroundColor =
			"dodgerblue";
		document.getElementById("ModalFooterDiv").style.backgroundColor =
			"dodgerblue";
	} else if (category == "tooshort") {
		modal.style.display = "block";
		document.getElementById("Modal Header").innerHTML =
			"Not enough letters";
		document.getElementById("Modal Body 1").innerHTML =
			"You need to add more letters to complete a guess";
		document.getElementById("ModalHeaderDiv").style.backgroundColor =
			"orangered";
		document.getElementById("ModalFooterDiv").style.backgroundColor =
			"orangered";
	} else if (category == "youwin") {
		modal.style.display = "block";
		document.getElementById("Modal Header").innerHTML = "Great Job!";
		const dbRef = ref(database);
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data["games"]);
			const gamesArray = Object.entries(data["games"]);
			gamesArray.sort((a, b) => b[1].score - a[1].score);
			console.log(gamesArray);
			var leaderboardtable = {};
			var leaderboardcode =
				"<table dir=ltr class='table table-success table-striped table-bordered' style='font-family: CURSIVE'><tr><th>Rank</th><th>Name</th><th>Score</th></tr>";
			for (let i = 0; i < gamesArray.length; i++) {
				const gameData = gamesArray[i][1];
				if (gameData.date == new Date().toDateString()) {
					//Only keeps scores from today

					if (leaderboardtable[gameData.name]) {
						leaderboardtable[gameData.name] += gameData.score;
					} else {
						leaderboardtable[gameData.name] = gameData.score;
					}
				}
			}
			leaderboardtable = Object.entries(leaderboardtable);
			console.log(leaderboardtable);
			// console.log(gamesArray);
			for (let i = 0; i < leaderboardtable.length; i++) {
				const playerData = leaderboardtable[i];
				leaderboardcode += `<tr><td>${i + 1}</td><td>${
					playerData[0]
				}</td><td>${playerData[1]}</td></tr>`;
			}
			document.getElementById("Modal Body 1").innerHTML = leaderboardcode;
		});

		document.getElementById("Modal Body 1").innerHTML = "";
		document.getElementById(
			"Modal Body 2"
		).innerHTML = `${WORDSDEF[rightGuessString]}`;
		document.getElementById(
			"Modal Footer"
		).innerHTML = `${score_n} :Your Score`;
		// document.getElementById("refresh").href += "?score=" + score_n;
		document.getElementById("refresh").innerHTML = "!Next round";
		document.getElementById(
			"whatsappshare"
		).innerHTML = `Share on Whatsapp`;
		document.getElementById("whatsappshare").href =
			"whatsapp://send?text=" +
			scoreboard +
			"%0a" +
			// RAGHIB CHANGE DAY NUMBER HERE !!!!!!
			"Day 6 Khardal Score: " +
			score_n +
			"%0a" +
			"www.khardal.net";
		document.getElementById("ModalHeaderDiv").style.backgroundColor =
			"forestgreen";
		document.getElementById("ModalFooterDiv").style.backgroundColor =
			"forestgreen";
		buttonize();
	} else if (category == "youlose") {
		modal.style.display = "block";
		document.getElementById("Modal Header").innerHTML =
			"You've run out of guesses! Game Over!";
		document.getElementById(
			"Modal Body 1"
		).innerHTML = `"${rightGuessString}" :The correct word was`;
		document.getElementById(
			"Modal Body 2"
		).innerHTML = `${WORDSDEF[rightGuessString]}`;
		document.getElementById("Modal Footer").innerHTML = `!Try again`;
		document.getElementById(
			"whatsappshare"
		).innerHTML = `Share on Whatsapp`;
		document.getElementById("whatsappshare").href =
			"whatsapp://send?text=" +
			scoreboard +
			"%0a" +
			"Khardal Score: " +
			score_n +
			"%0a" +
			"https://khardal.net/";
		document.getElementById("refresh").innerHTML = "Play Again";
		document.getElementById("ModalHeaderDiv").style.backgroundColor = "red";
		document.getElementById("ModalFooterDiv").style.backgroundColor = "red";
		buttonize();
	} else if (category == "lasttry") {
		modal.style.display = "block";
		document.getElementById("Modal Header").innerHTML = "Pssst...";
		document.getElementById("Modal Body 1").innerHTML = `This word means`;
		document.getElementById(
			"Modal Body 2"
		).innerHTML = `${WORDSDEF[rightGuessString]}`;
		document.getElementById(
			"Modal Footer"
		).innerHTML = `You're almost out of tries, but don't give up now`;
		document.getElementById("ModalHeaderDiv").style.backgroundColor =
			"dodgerblue";
		document.getElementById("ModalFooterDiv").style.backgroundColor =
			"dodgerblue";
	}
}
function renderLeaderboard() {
	const dbRef = ref(database);
	onValue(dbRef, (snapshot) => {
		const data = snapshot.val();
		console.log(data["games"]);
		document.getElementById("leaderboardmodal").style.display = "block";
		const gamesArray = Object.entries(data["games"]);

		// Sort the array based on the score property of gameData
		gamesArray.sort((a, b) => b[1].score - a[1].score);
		console.log(gamesArray);
		const leaderboard = document.getElementById("leaderboard");
		var leaderboardtable = {};
		var leaderboardcode =
			"<table dir=ltr class='table table-success table-striped table-bordered' style='font-family: CURSIVE'><tr><th>Rank</th><th>Name</th><th>Score</th></tr>";
		for (let i = 0; i < gamesArray.length; i++) {
			const gameData = gamesArray[i][1];
			if (gameData.date == new Date().toDateString()) {
				//Only keeps scores from today

				if (leaderboardtable[gameData.name]) {
					leaderboardtable[gameData.name] += gameData.score;
				} else {
					leaderboardtable[gameData.name] = gameData.score;
				}
			}
		}
		leaderboardtable = Object.entries(leaderboardtable);
		console.log(leaderboardtable);
		// console.log(gamesArray);
		for (let i = 0; i < leaderboardtable.length; i++) {
			const playerData = leaderboardtable[i];
			leaderboardcode += `<tr><td>${i + 1}</td><td>${
				playerData[0]
			}</td><td>${playerData[1]}</td></tr>`;
		}
		leaderboard.innerHTML = leaderboardcode;
	});
}
window.renderLeaderboard = renderLeaderboard;
