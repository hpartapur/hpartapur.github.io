const video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
const demosSection = document.getElementById("demos");
const enableWebcamButton = document.getElementById("webcamButton");
const countDisplay = document.createElement("div"); // Element to display count
countDisplay.style.position = "absolute";
countDisplay.style.bottom = "10px";
countDisplay.style.left = "10px";
countDisplay.style.backgroundColor = "rgba(255, 111, 0, 0.85)";
countDisplay.style.color = "#FFF";
countDisplay.style.padding = "5px";
countDisplay.style.zIndex = "3";
liveView.appendChild(countDisplay);

// Check if webcam access is supported.
function getUserMediaSupported() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (getUserMediaSupported()) {
	enableWebcamButton.addEventListener("click", enableCam);
} else {
	console.warn("getUserMedia() is not supported by your browser");
}

// Enable the live webcam view and start classification.
function enableCam(event) {
	if (!model) {
		return;
	}

	event.target.classList.add("removed");

	const constraints = {
		video: true,
	};

	navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
		video.srcObject = stream;
		video.addEventListener("loadeddata", predictWebcam);
	});
}

let model;

// Load the COCO-SSD model.
cocoSsd.load().then(function (loadedModel) {
	model = loadedModel;
	demosSection.classList.remove("invisible");
});

let children = [];

function predictWebcam() {
	model.detect(video).then(function (predictions) {
		// Clear previous detections
		for (let i = 0; i < children.length; i++) {
			liveView.removeChild(children[i]);
		}
		children.splice(0);

		let personCount = 0; // Counter for persons

		// Loop through predictions
		for (let n = 0; n < predictions.length; n++) {
			// Lower confidence threshold to count blurry or distant people
			if (predictions[n].score > 0.15 && predictions[n].class === "person") {
				personCount++; // Increment counter for each detected person

				const p = document.createElement("p");
				p.innerText = predictions[n].class + " - with " + Math.round(parseFloat(predictions[n].score) * 100) + "% confidence.";
				p.style =
					"margin-left: " +
					predictions[n].bbox[0] +
					"px; margin-top: " +
					(predictions[n].bbox[1] - 10) +
					"px; width: " +
					(predictions[n].bbox[2] - 10) +
					"px; top: 0; left: 0;";

				const highlighter = document.createElement("div");
				highlighter.setAttribute("class", "highlighter");
				highlighter.style =
					"left: " +
					predictions[n].bbox[0] +
					"px; top: " +
					predictions[n].bbox[1] +
					"px; width: " +
					predictions[n].bbox[2] +
					"px; height: " +
					predictions[n].bbox[3] +
					"px;";

				liveView.appendChild(highlighter);
				liveView.appendChild(p);
				children.push(highlighter);
				children.push(p);
			}
		}

		// Update the person count display
		countDisplay.innerText = `Number of people: ${personCount}`;

		window.requestAnimationFrame(predictWebcam);
	});
}
