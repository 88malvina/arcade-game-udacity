"use strict";
var button = document.getElementById('button');
var heart = document.getElementsByTagName('img');
// Enemies our player must avoid
class Enemy {
	constructor(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	var count = 0;
	this.x = 0;
	this.y = y;
    this.sprite = 'images/enemy-bug.png';
	this.speed = Math.round(Math.random()*(250-70)+50);
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	//this method is for move enemies and update their position
	update(dt) {
		this.x += this.speed*dt;
    if (this.x > 505) {
        this.x = 0;
        this.speed = Math.round(Math.random()*(250-70)+50); 
    }
	
	this.collision();//here I call collision for check of enemies with the player
	}
	
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Draw the enemy on the screen, required method for game

var count = 0; //this variable will count the numbers of collisions
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Enemy.prototype.collision = function() {
	 var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var enemyBox = {x: this.x, y: this.y, width: 60, height: 60};
    // Check for collisions, if playerBox intersects enemyBox
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
			count = count +1;
			heart[0].remove();//if there are the collision remove one live
			player.reset();//after collision move the player back
			
			if(count === 5) {//if the number of collisions reached to 5 restart the game
				alert('You lose');
				count = 0;
				location.reload();
			}
		}
}

class Player {
	constructor(sprite) {
		this.x = 200;
		this.y = 400;
		this.sprite = sprite;
	}
	update(dt){//player cannot move off screen
		if(this.x >450) {
			this.x = 200;
		}
		if(this.x < 0) {
			this.x = 200;
		}
		if(this.y >400) {
			this.y = 400;
		}
		if(this.y < -40) {
			alert('You Won!');
			this.reset();
		}
	}
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	handleInput(keys){
		if(keys === 'up') {
			this.y = this.y - 90;
		}
		if(keys === 'down') {
			this.y = this.y + 90;
		}
		if(keys == 'left') {
			this.x = this.x - 90;
		}
		if(keys == 'right') {
			this.x = this.x + 90;
		}
	}
	reset() {
		this.x = 200;
		this.y = 400;
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
var enemy1 = new Enemy(220);
var enemy2 = new Enemy(150);
var enemy3 = new Enemy(60);
var enemy4 = new Enemy(70);
var enemy5 = new Enemy(170);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);
const player = new Player('images/char-horn-girl.png');

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

button.addEventListener('click',function(e) {//button will restart the game
	location.reload();
});
