const cityOptions = {
    usa: ['Fremont', 'LA', 'Chicago', 'Seattle', 'Portland'],
    uk: ['London', 'Birmingham', 'Manchester', 'Oxford'],
    ea: ['Nairobi', 'Mombasa', 'Daressalaam', 'Kampala', 'Nakuru']
  };
  
  function populateCities() {
    const regionSelect = document.getElementById('region');
    const citySelect = document.getElementById('city');
    const selectedRegion = regionSelect.value;
  
    // Clear the city dropdown
    citySelect.innerHTML = '';
  
    // Populate city dropdown based on selected region
    if (selectedRegion !== '') {
      const cities = cityOptions[selectedRegion];
      for (let i = 0; i < cities.length; i++) {
        const option = document.createElement('option');
        option.value = cities[i];
        option.text = cities[i];
        citySelect.appendChild(option);
      }
    }
  }
  
  function renameImages() {
    const files = document.getElementById('images').files;
    const region = document.getElementById('region').value;
    const city = document.getElementById('city').value;
    const option3 = document.getElementById('option3').value;
  
    // Check if any files are selected
    if (files.length === 0) {
      alert('Please select one or more images.');
      return;
    }
  
    // Rename and download the files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newName = `${region}-${city}-${option3}-${i + 1}${getFileExtension(file.name)}`;
      download(file, newName);
    }
  }
  
  function getFileExtension(filename) {
    return '.' + filename.split('.').pop();
  }
  
  function download(file, newName) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = newName;
    link.click();
  }
  function capturePhoto() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      // Access the user media (camera) using getUserMedia
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const videoElement = document.createElement('video');
          videoElement.srcObject = stream;
          videoElement.play();
  
          // Create a canvas element to capture the photo
          const canvasElement = document.createElement('canvas');
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
  
          // Draw the video frame onto the canvas
          const context = canvasElement.getContext('2d');
          context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
          // Stop the video stream
          stream.getTracks().forEach((track) => track.stop());
  
          // Convert the canvas image to a Blob
          canvasElement.toBlob((blob) => {
            // Handle the captured photo blob, e.g., display it or upload it
            // Replace the following line with your own logic
            console.log('Captured photo:', blob);
          }, 'image/jpeg');
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }
  }
  