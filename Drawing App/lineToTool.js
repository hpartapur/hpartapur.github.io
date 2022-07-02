//This tool doesn't draw until mouse is released, when drawing is false. 
//If start mousex and mousey are in the middle of the page, it measures the final point, and only when it's released does it draw the line.
// loadPixels draws, and updatePixels finalizes the image. 

function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

			else{
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
