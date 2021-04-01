function rand(min, max) {
    return Math.random() * (max - min) + min;
}

class Game
{
	 constructor ()
	 {
		  this.canvas = document.getElementById ("game-canvas");
		  this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
		  this.context = this.canvas.getContext("2d", {
            alpha: true
        });

		  this.context.fillStyle = "black";
		  this.context.fillRect (0, 0, this.canvas.width, this.canvas.height);
		  
        this.lastTime = 0;
        this.deltaTime = 0;
        this.elapsedFrames = 0;

		  this.player_x = this.canvas.width / 2;
		  this.player_y = this.canvas.height / 2;
		  this.dir_x = 0;
		  this.dir_y = 0;
		  this.ending_x = rand (100, this.canvas.width - 200);
		  this.ending_y = rand (100, this.canvas.height - 200);
		  this.done = false;
		  this.running = true;

		  this.score = 0;
		  this.timer = 10;

		  document.addEventListener ("keydown", function (event) {
				switch (event.keyCode)
				{
					 case 38:
					 this.dir_y = -1;
					 break;
					 case 40:
					 this.dir_y = 1;
					 break;
					 case 37:
					 this.dir_x = -1;
					 break;
					 case 39:
					 this.dir_x = 1;
					 break;
				}
		  }.bind (this));

		  document.addEventListener ("keyup", function (event) {
				switch (event.keyCode)
				{
					 case 38:
					 this.dir_y = 0;
					 break;
					 case 40:
					 this.dir_y = 0;
					 break;
					 case 37:
					 this.dir_x = 0;
					 break;
					 case 39:
					 this.dir_x = 0;
					 break;
				}
		  }.bind (this));
		  
		  this.request = requestAnimationFrame(this.loop.bind(this));
	 }

	 loop (timestamp)
	 {
		  if (this.running)
		  {
				this.update (timestamp);
				this.render ();
				this.request = requestAnimationFrame(this.loop.bind(this));
		  }
	 }

	 render ()
	 {
		  if (this.done)
		  {
				this.context.fillStyle = "black";
				this.context.fillRect (0, 0, this.canvas.width, this.canvas.height);

				this.done = false;
				this.player_x = this.canvas.width / 2;
				this.player_y = this.canvas.height / 2;
				this.ending_x = rand (100, this.canvas.width - 200);
				this.ending_y = rand (100, this.canvas.height - 200);
				this.score += this.timer * 10;
				this.timer = 10;
		  }

		  this.context.fillStyle = "black";
		  this.context.fillRect (0, 0, 200, 200);
		  
		  this.context.fillStyle = "white";
		  this.context.font = "20px monospace";
		  this.context.fillText ("Score: " + this.score.toFixed(1), 25, 25);
		  
		  this.context.fillStyle = "white";
		  this.context.font = "20px monospace";
		  this.context.fillText ("Timer: " + this.timer.toFixed(1), 25, 60);
		  
		  this.context.fillStyle = "blue";
		  this.context.fillRect (this.ending_x, this.ending_y, 100, 100);
		  
		  this.context.fillStyle = "green";
		  this.context.font = "20px monospace";
		  this.context.fillText ("HERE!", this.ending_x + 25, this.ending_y + 50);
		  
		  this.context.fillStyle = "red";
		  this.context.fillRect (this.player_x, this.player_y, 3, 3);
	 }
	 
	 update (timestamp)
	 {
		  this.elapsedFrames++;
        this.deltaTime = (timestamp - this.lastTime);
        this.lastTime = timestamp;

		  this.timer -= 0.001 * this.deltaTime;
		  
		  this.player_x += this.dir_x * this.deltaTime * 0.1;
		  this.player_y += this.dir_y * this.deltaTime * 0.1;

		  if (this.player_x > this.ending_x && this.player_x < this.ending_x + 100
				&& this.player_y > this.ending_y && this.player_y < this.ending_y + 100)
		  {
				this.done = true;
		  }

		  if (this.timer < 0)
		  {
				alert ("LMFAO, you lost The Game!");
				this.running = false;
		  }
	 }
}

let game = new Game ();
