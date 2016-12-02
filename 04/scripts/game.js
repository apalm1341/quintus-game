window.onload = function() {
  var Q = window.Q = Quintus({development: true})
    .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio")
    .include("ActionPlatformerPlayer, ActionPlatformerEnemy")
    .setup({
      width: 320,   //to fit devices with a screne resolution of 1280 x 720
      height: 180,
      scaleToFit: true
    }).controls().touch();

    Q.setImageSmoothing(false);

    Q.scene("level",function(stage) {
      //var player;      
      Q.stageTMX("small_level.tmx",stage);

      var player = Q("Player").first();
      stage.add("viewport").follow(player, {x: true, y: true});
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
    Q.loadTMX("small_level.tmx, sprites.json, sprites.png", function() {       
      Q.compileSheets("sprites.png","sprites.json");     
      Q.stageScene("level");
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
        
        
  };      
        
        