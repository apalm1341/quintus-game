Quintus.ActionPlatformerEnemy = function(Q) { //new module(ActionPlatformerEnemy) for enemy character
	//you can add components to other classes, listen to collision detection by listening to certain events, and once you collide with something, u can access what u collided with and check whether it is an element of a certain type and carry out specific actions accordingly!
	Q.component("commonEnemy", {//common enemy is name of componenet...
			added: function() {
			var entity = this.entity;//this gives access to current object...will be able to access certain event in here since we called/added component down below..
			entity.on("bump.left, bump.right, bump.bottom", function(collision){
				if(collision.obj.isA("Player")) { //this is method that allows us to check what type of class console.log(collision); is!Player is type of class we r colliding with...
					
					//Decrease the lives by 1 when you are hit
					Q.state.dec("lives",1);
					//If the player is at or below 0 lives...couldn't we just say if player at 0? cause it can't get negative can it?
					if(Q.state.get("lives")<=0){
						Q.stageScene("endGame",1, {label: "You Died"});//calls the end game scene from player.js file 
						//alert("Game Over!"); //this shows box that appears on screen...
						//Q.state.set("lives",3); //this makes lives go back to 3 lives for player!...restarts it to 3 after reaches 0 lives 
					}
					//Q.state.set("lives",3);
					//Stage the level again.
					else
						Q.stageScene("level"); //reloads the level shown in tmx file!!!//makes ghost go back to original spot it started on screen!
					
					console.log('you died!'); //Player dies!shows only in console in chrome dev tools!
				}
				//console.log(collision); //allows us to see what we get when collision occurs!
			});    //wanna listen to certain events so we use "on" in quintus!
			entity.on("bump.top", function(collision){
				if(collision.obj.isA("Player")) {
					//make the player jump
					collision.obj.p.vy = -100;
					
					//kill enemy
					this.destroy();
				}
			});
			} //added some methods here..added is method..when you add a component, the method called added will get executed...and you will have access to object itself...
	}); //there r events that r predefined that have to do with collision detection..can info on that in quintus_2d...
	Q.Sprite.extend("GroundEnemy", { //create new class(GroundEnemy) for ground enemies that walk on ground..this class will extend the sprite class that comes with quintus...
		init: function(p) {
			this._super(p, {vx: -50, defaultDirection: "left", sheet: "ghost"}); //could add sheet here to pick sprite/character from spritesheet such as blue alien but instead we r just loading sheet from tiled
			this.add("2d, aiBounce, commonEnemy"); //commonEnemy is component and adding it here allows us to access/execute it here...ai bounce makes enemies go from one side and then hit a wall and then walk to the other side...
		},
		step: function(dt) { //sprites have method called step and step is executed as many times as possible..dt is parameter that occured since last time this method was called..
			//on every step, we want to be checking for what the next tile has...
			//first, we must check if enemies on firm ground..then next, we want to check if next tile is empty, then we must switch sides...
			var dirX = this.p.vx / Math.abs(this.p.vx); //will give us 1 or -1..gives us direction we r going..
			var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT)//allows us to check whether we r on ground or not...
			var nextElement = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT); //this is correct line not one below..this from 07 enemy file i think!
			//var nextElement = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT) //want to locate method? and searching for sprite defaults 
			//this looks forward right one after actual enemy..
			var nextTile;
			
			if(nextElement instanceof Q.TileLayer) { //this element allows us to check for tiles...and because the elements are represented internally as a tiled layer
				nextTile = true;
			}
			
			//if we are not on ground and there is a cliff
			if(!nextTile && !ground) { //if there is not a nextTile,we r on a cliff, and we r on top of the ground, ...had to add ! in front of ground so bees stay on cliffs...
								//then, we do the corresponding switches of direction!
			if(this.p.vx > 0) {
          if(this.p.defaultDirection == "right") { //if we r going to the right, then we will flip directions!
            this.p.flip = "x";
          }
          else { //if we r going left, then we stay cause default direction is left!
            this.p.flip = false;
            this.p.flip = "x";
          }/*
          else {
            this.p.flip = false;
          }*/
        }
        this.p.vx = -this.p.vx; //velocity changes to opposite so it bounces back! this is what we want so that it does not fall off of the cliff!!! 
      } //also make sure to check quintus_2d file in lib under 7th folder to see code for making enemy kinda vibrate back and forth/stutter when player right next to it on top of cliff near edge of cliff!!
    }
  });  //this_super needed to be changed to this._super..in order to fix blank white screen and make actual game display! i think
	Q.Sprite.extend("VerticalEnemy", {
    init: function(p) {
      this._super(p, {vy: -100, rangeY: 40, gravity: 0, sheet: "gray-alien" });
      this.add("2d, commonEnemy"); //this might need to be moved in order to add enemy!not sure
		//adding this to make vertical enemies show up..but not doing what supposed to right now!!!
      this.p.initialY = this.p.y;
      this.p.initialVy = this.p.vy;
      this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);
	  //Log this vertical enemy's properties to see them in the console (F12)
	  console.log(this.p)
		/*
      this.on("bump.top, bump.bottom",function(collision) {
        that.p.vy = -Math.abs(that.p.initialVy) * that.p.vyDirection;
        that.p.vyDirection = that.p.vy/Math.abs(that.p.vy);
      });*/
	  this.on("bump.top, bump.bottom",function(collision) {
        this.p.vy = -Math.abs(this.p.initialVy) * this.p.vyDirection;
        this.p.vyDirection = this.p.vy/Math.abs(this.p.vy);
      }); // had to change that to this to make vertical enemies move up and down!
    },
    step: function(dt) {            
      if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
        this.p.vy = -this.p.vy;   
        this.p.vyDirection *= -1;               
      } 
      else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
        this.p.vy = -this.p.vy;  
        this.p.vyDirection *= -1;                 
      } 
    }
  });
	
	//look into file quintus_sprites in lib folder in 5 folder to learn more about sprites and the 2d module... 
};