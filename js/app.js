// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed=randomInt(1,15); //initialises random speed
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
        this.speed=randomInt(1,15);//produces a random speed unit within range dor the enemy to start over
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player= class {
    constructor(x,y){
        this.sprite= 'images/char-cat-girl.png';
        this.x=x;
        this.y=y;
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(){}
    render(){}


}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// console.log(randomInt(0,300));
let allEnemies=[new Enemy(randomInt(0,300),68), new Enemy(randomInt(0,300),151), new Enemy(randomInt(0,300),234)];//initialises enemy at random start position in x direction
let player= new Player;



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

