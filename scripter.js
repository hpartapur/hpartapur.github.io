let video;
let detector;
let peopleCount = 0;
const countedIDs = new Set();

async function setupCamera() {
	video = document.getElementById("video");
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

async function detect() {
	const predictions = await detector.detect(video);
	predictions.forEach((prediction) => {
		if (prediction.class === "person" && !countedIDs.has(prediction.id)) {
			countedIDs.add(prediction.id);
			peopleCount++;
			document.getElementById("peopleCount").innerText = peopleCount;
		}
	});
	requestAnimationFrame(detect);
}

async function main() {
	await setupCamera();
	detector = await cocoSsd.load();
	detect();
}

main();
