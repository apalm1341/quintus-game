Quintus.ActionPlatformerPlayer = function(Q) {


	/*
		To use the Javascript Console in Chrome, press F12
		Some useful script are:
		Q("Player").first()//get the player
		Q("Player").first().p.y = 100; //set the player's y to 100
		Q("Player").first().p.y -=400; //Set the player's y to be -400 from its current position
		Q("Player").first().p.gravity = 0;//disable gravity
		
	
	*/

	// http://www.html5quintus.com/api/classes/Q.Component.html
	// This component seems to intercept left and right movement and allow them to be modified.
	Q.component("newControls",{
		added:function(){
			//Turn on this function
			this.entity.on("step",this,"step");
		},
		//step function is run every frame
		step:function(){
		
			var dualInput = false;
			
			//-----------------------------
			// ←↖↑↗→↘↓↙←
			//-----------------------------
			
			//If the user holds down the up and right arrows together
			if( Q.inputs.right && Q.inputs.up )
			{ 
				console.log("↗"); 
				dualInput = true; 
				
				// Make jumping right much higher than normal.
				this.entity.p.y -= 2;
			}
			
			if( Q.inputs.right && Q.inputs.down )
			{ console.log("↘"); dualInput = true; }
			
			if( Q.inputs.left && Q.inputs.down )
			{ console.log("↙"); dualInput = true; }
			
			if( Q.inputs.left && Q.inputs.up )
			{ console.log("↖"); dualInput = true; }
			
			if( false === dualInput )
			{
				if( Q.inputs.left )
				{ console.log("←") }
			
				if( Q.inputs.right )
				{ console.log("→"); this.entity.p.y -= 2; }
			
				if( Q.inputs.up )
				{ console.log("↑") }
			
				if( Q.inputs.down )
				{ console.log("↓") }
			}
		}
	});

  Q.Sprite.extend("Player", {    // creates an OBJECT that is a sprite. This object uses a 'sheet' or picture to represent it in the world. The game references the "Player" as an object.
//As with "Enemy" There are multiple Bee's, each are INDIVIDUAL objects that use the bee 'sheet' or picture....I changed Player to Ghost cause I want to change character figure being used on this level!!
    init: function(p) { //init method is what is called when you creates player..it is constructor!!
      this._super(p, { //uses super to call parent (Sprite)...
        sheet: "ghost",  //ghost is image that will be used from json file! even if u used different image from map editor!!!....I changed player to ghost!..this changes character you play as and makes ghost appear on screen instead!!!I believe even if u have other character in tiled used, it will use character from sprites.json!!!
        jumpSpeed: -300,
        speed: 100, //speed of movement...
      });
      this.add("2d, platformerControls");  //this adds 2 different componenets...2d component means there will be gravity/basic physics collision and platformerControls which allows you to move with both keys and touch screen!!!...             
	  
		this.add("newControls");//Add the new controls create above
    //},all
	
	// Write event handlers to respond hook into behaviors. ...new line of copied code starts here!
    // hit.sprite is called everytime the player collides with a sprite
    this.on("hit.sprite",function(collision) {
      // Check the collision, if it's the Tower, you win!
	  console.log(collision);
      if(collision.obj.isA("Tower")) { //In Tiled you need to remove the tower/door in the collision layer. Instead create it inside the object layer, this is how you interact with other things as per the TMX and Quintus API...Rename the sprite as "Tower"(inTiled???) not "tower" and change line 53 in player.js back to "Tower" as well. 
        // Stage the endGame scene above the current stage
        //alert('You win!);
		
		Q.stageScene("endGame",1, { label: "You Won!" }); //this shows black round rectangle box saying "You Won!"...this different than if you just use alert line below!//alert here!tower=door!
        //alert('You win!'); //this just makes sharp cornered display box that is white instead of black!!
		// Remove the player to prevent them from moving
        this.destroy(); //makes ghost/player disappear!!!
      }
    }); //need to make it so that after destroying player...u can click button prompting user to go to next level!!!
  }
});  

// Sprites can be simple, the Tower sprite just sets a custom sprite sheet
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});  
  
  // To display a game over / game won popup box, 
// create a endGame scene that takes in a `label` option
// to control the displayed message.
Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({//shows whole black image!
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Play Again" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
  // When the button is clicked, clear all the stages
  // and restart the game.
  button.on("click",function() {//button of play again
    Q.clearStages();
    Q.stageScene('level');//was level1...changed to level and this should make me be able to fix the issue of pressing play button to restart level!
	Q.state.set("lives", 3);//sets me back to 3 lives...
  });

  // Expand the container to visibily fit it's contents
  container.fit(20);
  //box.fit(20); //seems like this does same thing as container.fit(20);
});
}; //ends here! ok cool*/
//player initiates a sprite with class of player...