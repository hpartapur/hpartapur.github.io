let net;
let video;
let webcamButton;
let countDisplay;
let countElement;

async function setupCamera() {
	video = document.getElementById("webcam");
	const stream = await navigator.mediaDevices.getUserMedia({
		video: true,
	});
	video.srcObject = stream;

	return new Promise((resolve) => {
		video.onloadedmetadata = () => {
			resolve(video);
		};
	});
}

async function detectPeople() {
	const predictions = await net.detect(video);
	const peopleCount = predictions.filter((pred) => pred.class === "person").length;
	countElement.innerText = peopleCount;
	requestAnimationFrame(detectPeople);
}

async function main() {
	net = await cocoSsd.load();
	countElement = document.getElementById("count");
	const webcamButton = document.getElementById("webcamButton");

	webcamButton.addEventListener("click", async () => {
		await setupCamera();
		video.play();
		document.getElementById("demos").classList.remove("invisible");
		detectPeople();
	});
}

main();
