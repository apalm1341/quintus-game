window.addEventListener("load",function() {
  var Q = window.Q = Quintus({development: true}) //Q is game!
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy") //new module called ActionPlatformerPlayer! and added enemy one cause i had to add enemy file for enemy character...
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true
    }).controls().touch();

    Q.setImageSmoothing(false);

    Q.scene("level",function(stage) {
		var player; //will keep player...
      Q.stageTMX("small_level3.tmx",stage);  //changed this by adding 3 since page not loading...file names had to match...  
		player = Q("Player").first();
	stage.add("viewport").follow(player, {x: true, y: true}); //viewport allows camera to move x and y directions on screen!...viewport allows me to move SCREEN!!! along with character I am playing as while I move around! so that I see whole level/area and not just part of it!!
		Q.stageScene("hud",1);
    });
	//Create the Game State
	Q.state.set({
		lives:3
	})
	
	//Create a new scene for the Heads up Display
	Q.scene("hud",function(stage){
		//Create a container that stores the hud items
		var cont = stage.insert(new Q.UI.Container({w:Q.width,h:100,fill:"white",opacity:0.5}));
		console.log(cont);
		//The text that contains the lives
		//The label is what is displayed.
		//Q.state.get("lives") get the number of lives from the gamestate. The label has ""+ because lives is a number and the label has to be a string.
		var text = cont.insert(new Q.UI.Text({x:10,y:10,label:""+Q.state.get("lives")}));
		//Listen to the game state for when the lives variable changes
		Q.state.on("change.lives",text,function(){
			text.p.label = ""+Q.state.get("lives");
		});
	});
    //load assets
    Q.loadTMX("small_level3.tmx, sprites.json, sprites.png", function() { //added 3 to small level cause added another file...  //added sprites2.json here...testing!!!    
      Q.compileSheets("sprites.png","sprites.json"); //json file contains info about sprites.png file!!!
      Q.stageScene("level"); //might be able to do compile sheets stuff for adding door and doing similar thing like question box!!!
	  //Q.compileSheets("door2.png","sprites2.json"); //testing this..!!!
    });
    
	//The question box sprite.
	Q.Sprite.extend("QuestionBox",{
		init:function(p){
			this._super(p,{
				//Take the power sheet from sprites.json
				sheet:"power",
				//The collision type
				type:Q.SPRITE_DEFAULT,
				gravity:0
			});
			this.add("2d");
			//Turn on a function when the sprite is hit from the bottom
			this.on("bump.bottom",this,"displayText");
			console.log(this)
		},
		displayText:function(col){
			//Increase the lives by 1
			Q.state.inc("lives",1);
		}
		
	});
	
	
	
	//The door sprite.
	/*Q.Sprite.extend("Door2",{
		init:function(p){
			this._super(p,{
				//Take the power sheet from sprites.json
				sheet:"door2",
				//The collision type
				type:Q.SPRITE_DEFAULT,
				gravity:0
			});
			this.add("2d");
			//Turn on a function when the sprite is hit from the bottom
			this.on("bump.bottom",this,"displayText");
			console.log(this)
		},
		displayText:function(col){
			//Increase the lives by 1
			Q.state.inc("lives",1);
		}
		
	});-all this code i can probly get rid of!*/
	
	
	//Turn on the bounding boxes visualization...this adds purple lines/boxes... These are the debug lines that show the width and height of sprites, and also their collision points.
	//Q.debug = true;

});
        
        
        
        
        
        