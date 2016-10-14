var canvas = document.querySelector('canvas');
var ballNo=document.getElementById('ballNo');//span
var submit_button=document.getElementById('submit_button');
var input_no=document.getElementById('input_no');

var ctx = canvas.getContext('2d');
canvas.addEventListener("click",getClickPosition,false);
var width = canvas.width = window.innerWidth; 
var height = canvas.height = window.innerHeight/2; // divided bt 2
var no_of_balls=35;
//update noumber of balls


// function to generate random number



function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(){
	//this.x=random(0,width);
	//this.y=random(0,height);
	this.x=width/2;
	this.y=height/2;
	this.velX=random(-7,7);
	this.velY=random(-7,7);
	this.color='rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
	this.size=random(10,20);


}

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
	ctx.fill();
}

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect=function(){
	for(j=0;j<balls.length;j++){
		if(!(this.x===balls[j].x && this.y===balls[j].y && this.velX===balls[j].velX && this.velY===balls[j].velY)){
			var dx=this.x-balls[j].x;
			
			var dy=this.y-balls[j].y;
			
			var distance= Math.sqrt(dx*dx+dy*dy);

			if (distance< this.size +balls[j].size){
				balls[j].color=this.color='rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
			}

		}
	}
}



var balls = [];

function loop(){
	ctx.fillStyle='rgba(0,0,0,1)';
	ctx.fillRect(0,0,width,height);

	while(balls.length<no_of_balls){
		var ball= new Ball();
		balls.push(ball);

	}

	for (i=0;i<balls.length;i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	requestAnimationFrame(loop);
}
//loop();
//ctx on click event
function getClickPosition(e) {
	console.log('clicked');
    var xPosition = e.clientX - canvas.style.left; //aded something 
    var yPosition = e.clientY;
    console.log('X:'+xPosition);
    for(j=0;j<balls.length;j++){
    	balls[j].x=xPosition;
    	balls[j].y=yPosition;
    	balls[j].velX=random(-7,7);
	    balls[j].velY=random(-7,7);

    }
    
}
loop();

submit_button.onclick=function(){
	console.log('submitted');
	no_of_balls=input_no.value;
	ballNo.innerHTML=no_of_balls;
	balls=[];
	console.log('empty');
	console.log(balls.length);
	//loop();

}



