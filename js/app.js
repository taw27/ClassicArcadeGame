let tile={ height:78, width: 101};//object defines the timensions of a tile in the game grid
let grid=(function(){
    let array=[]; //initialises empty array
    for(let i=0;i<6;i++){ // populates a 2d array with the tile coordinates
        array[i]=[];
        for(let j=0;j<5;j++){
            array[i][j]={x:j*tile.width, y:i*tile.height};
        }
    }
    return array;
})();//Use immediately invoked function to create something like a 2D array with coordinates of each tile in the grid

// Enemies our player must avoid
var Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
    this.x=x; //the x coordinate of the enemy tile from top left edge of image
    this.y=y; // the y coordinate of the enemy tile from top left edge of image
    this.speed=randomInt(this.speedLim.lowerLim,this.speedLim.upperLim); //initialises random speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.collisionHandler(); //invoked to deal with possible collisions
    this.x+=this.speed; // causes movement of enemy in x direction
    
    if(this.withinBounds()===true){ //checks if within bounds
        ctx.drawImage(Resources.get(this.sprite),this.x*dt,this.y); //updates the enemy in the canvas
    }
    else{ //if not in bounds
        this.x=0; // starts enemy from the left edge
        this.speed=randomInt(this.speedLim.lowerLim,this.speedLim.upperLim);//produces a random speed unit within range dor the enemy to start over
        this.y=this.rows[randomInt(0,this.rows.length)]; // starts the enemy instance into a random row at the begining of boundary after raching the end of the boundary
    }
};

// checks if enemy is within bounds of the canvas grid
Enemy.prototype.withinBounds=function(){
    if(this.x<=505){
        return true;
    }
    else{
        return false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//the rows for the enemy class
Enemy.prototype.rows=[tile.height,tile.height*2,tile.height*3];
// speed upper and lower limits

Enemy.prototype.speedLim={lowerLim:2, upperLim:10};

//Method that checks if collision occured and the sets the player to initial position if there was one
Enemy.prototype.collisionHandler=function(){
    if(this.x>=player.x && this.x<(player.x+tile.width) && this.y>=player.y && this.y<(player.y+tile.height)){ //logic to check if collision happened
        player.x=grid[5][2].x;
        player.y=grid[5][2].y;
    }
};

// This class requires an update(), render() and
// a handleInput() method.
let Player= class {
    constructor(x,y){
        this.sprite= 'images/char-boy.png'; //image of the player
        this.x=x; //the x coordinate of the player tile from top left edge of image
        this.y=y; //the y coordinate of the enemy tile from top left edge of image
        this.reachedEnd=false; // boolean that acts as a flag to check if the player reached the end of the game canvas
    }

    // method that updates the location of then player in the canvas
    update(){
        if(this.x>=0 && this.x<=505 && this.y>=0 && this.y<=606){ //checks boundary conditions
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //draws the updated location on canvas
        }
        
    }

    // makes initial render of the player
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // method handles the key inputs made to the player based on the key direction
    handleInput(allowedKeys){
        switch(allowedKeys){
            case 'left':
            this.goLeft(); //invoked to handle left key movement
            break;
            case 'right': //invoked to handle righ key movement 
            this.goRight();
            break;
            case 'up': //invoked to handle up key movement
            this.goUp();
            break;
            case 'down': //invoked to handle down key movement
            this.goDown();
        }
    }

    //method that handles left movement logic
    goLeft(){
        if(this.x>=tile.width*1 && this.x<=tile.width*5 && !this.reachedEnd){ //checks boundary conditions
            this.x=grid[this.y/tile.height][(this.x/tile.width)-1].x; //moves a tile left
           }
    }

    //method that handles right movement logic
    goRight(){
        if(this.x>=0 && this.x<=tile.width*3  && !this.reachedEnd){ //checks bopundary conditions
            this.x=grid[this.y/tile.height][(this.x/tile.width)+1].x; // moves player a tile right
           }
    }

    //method that handles left movement logic
    goDown(){
        if(this.y>=0 && this.y<=tile.height*4  && !this.reachedEnd){ //checks boundary conditions
            this.y=grid[this.y/tile.height+1][(this.x/tile.width)].y; // moves player a tile down
           }
    }

    //method that handles left movement logic
    goUp(){
        if(this.y>=tile.height*1 && this.y<=tile.height*5  && !this.reachedEnd){  //checks boundary conditions
            this.y=grid[(this.y/tile.height)-1][(this.x/tile.width)].y; //moves player a tile up
        }
        if(this.y===grid[0][0].y){ //checks if player has reached end of the game
            gameEnd(); //invoked to handle end game logic
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies=[new Enemy(randomInt(0,300),tile.height), new Enemy(randomInt(0,300),tile.height*2), new Enemy(randomInt(0,300),tile.height*3)];//initialises enemy at random start position in x direction
let player= new Player(grid[5][2].x,grid[5][2].y);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Random int generator function
// takes in the lower liomit and upper limit and returns an int between those values
function randomInt(lowerLim,upperLim){
    return Math.floor((Math.random()*(upperLim-lowerLim))+lowerLim);
}

//function that handles end game logic
function gameEnd(){
    player.reachedEnd=true; //sets players reachend property boolean to true
    document.querySelector(".finish-popup").style.display="block"; //displays the end game modal
    document.querySelector(".popup-restart").addEventListener('click', ()=>{ //adds event listener to restart button
        document.querySelector(".finish-popup").style.display="none"; //sets the modal display to none if button clicked
        player.x=grid[5][2].x; // sets x coordinate of player to inital position
        player.y=grid[5][2].y; //sets y coordinate of player to initial position
        player.reachedEnd=false; //resets the endgame property to false
    }); 
}
