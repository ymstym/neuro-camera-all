
$(document).ready(function(){
	//Canvas stuff
	var CANVAS_WIDTH = 750;
	var CANVAS_HEIGHT = 500;

	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo($('.superman-container'));

	var canvasColor = "#81D4FA";
	var d = "";

	// counter
	turn = 0;

	var plane = {
		img: new Image(),
		w: 150,
		h: 150,
		posx: 100,
		posy: (CANVAS_HEIGHT/2),
		draw: function() {
			if(d == "up") {
				if (plane.posy - 10 > 0)
					plane.posy = plane.posy - 10;
			}
			else if(d == "down") {
				if (plane.posy + 10 < CANVAS_HEIGHT)
					plane.posy = plane.posy + 10;
			}
			d = "";
			canvas.drawImage(this.img, this.posx - (this.w / 2), this.posy - (this.h / 2), this.w, this.h);
		}
	};

	var cloud_array = [];

	function cloud() {
		this.img = new Image();
		this.w = 100;
		this.h = 100;
		this.posx = CANVAS_WIDTH;
		this.posy = 0;
		this.draw = function() {
			this.posx = this.posx - 10;
			canvas.drawImage(this.img, this.posx - (this.w / 2), this.posy - (this.h / 2), this.w, this.h);
		};
		this.init = function() {
			this.img.src = "img/superman/cloud.png";
			this.posy = Math.random() * CANVAS_HEIGHT;
		};
	}

	plane.img = new Image();
	plane.img.src = "img/superman/superman.png"; 

	var trackingMouse = false;

	var FPS = 30;
	setInterval(function() {
	  update();
	  draw();
	  turn++;
	  if (turn % 25 == 0) {
	  	addCloud();
	  }
	}, 1000/FPS);

	function update() {
	}

	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		canvas.fillStyle = canvasColor;
		canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  		plane.draw();
  		for (var i = 0; i < cloud_array.length; i++) {
  			cloud_array[i].draw();
  		};
	}

	function addCloud() {
		var c = new cloud();
		c.init();
		cloud_array.push(c);
	}

	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		//The snake is now keyboard controllable
	})

	/*
	handle mouse movements inside the canvas - COMMENTED
	canvasElement.mousemove(function(e) {
		if (trackingMouse) {
			var parentOffset = $(this).offset(); 
			pos.x = e.pageX - parentOffset.left;
			pos.y = e.pageY - parentOffset.top;
		}
	});

	canvasElement.mouseenter(function(){
		trackingMouse = true;
	});

	canvasElement.mouseleave(function() {
		trackingMouse = false;
	});
	*/

});
	