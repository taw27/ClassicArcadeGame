let grid=(function(){
    let array=[];
    for(let i=0;i<6;i++){
        array[i]=[];
        for(let j=0;j<5;j++){
            array[i][j]={x:j*(505/5), y:i*(606/6)};
        }
    }
    return array;
})();
console.log(grid);
// Enemies our player must avoid
// console.log(grid);
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed=randomInt(this.speedLim.lowerLim,this.speedLim.upperLim); //initialises random speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    this.x+=this.speed;
    
    if(this.withinBounds()===true){
        ctx.drawImage(Resources.get(this.sprite),this.x*dt,this.y);
    }
    else{
        this.x=2;
        this.speed=randomInt(this.speedLim.lowerLim,this.speedLim.upperLim);//produces a random speed unit within range dor the enemy to start over
        this.y=this.rows[randomInt(0,this.rows.length)]; // starts the enemy instance into a random row at the begining of boundary after raching the end of the boundary
    }
};

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
Enemy.prototype.rows=[68,151,234];
// speed upper and lower limits
Enemy.prototype.speedLim={lowerLim:3, upperLim:10};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player= class {
    constructor(x,y){
        this.sprite= 'images/char-boy.png';
        this.x=x;
        this.y=y;
    }
    update(){
        if(this.x>=0 && this.x<=505 && this.y>=0 && this.y<=606){
            return true;
        }
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(allowedKeys){
        switch(allowedKeys){
            case 'left':
            this.goLeft();
            break;
            case 'right':
            this.goRight();
            break;
        }
    }

    goLeft(){
        if(this.x>=101 && this.x<=505){
            this.x=grid[this.y/101][(this.x/101)-1].x;
            this.update();
           }
    }

    goRight(){
        if(this.x>=0 && this.x<=303){
            this.x=grid[this.y/101][(this.x/101)+1].x;
            this.update();
           }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// console.log(randomInt(0,300));
let allEnemies=[new Enemy(randomInt(0,300),68), new Enemy(randomInt(0,300),151), new Enemy(randomInt(0,300),234)];//initialises enemy at random start position in x direction
// let player= new Player(300,200);
console.log([grid[4][2].x]);
let player= new Player(grid[4][2].x,grid[4][2].y);



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
// takes in the lower liomit and upper klimit and returns an int between those values
function randomInt(lowerLim,upperLim){
    return Math.floor((Math.random()*(upperLim-lowerLim))+lowerLim);
}

