var canvas = document.getElementById("myGame");
var context = canvas.getContext('2d');

// Score
var score = 0;
var time = 60;

// Property of rectangle
var x = 10;
var y = 50;
var speed = 2;
var sideLength = 20;

// Property of target
var targetX = 200;
var targetY = 50;
var targetLength = 5;
var up = false;
var down = false;
var right = false;
var left = false;

var background = new Image();

var play = new Image();
play.src = "https://1.bp.blogspot.com/-fVAKH-3TLuo/W5onDDHje0I/AAAAAAAAB4I/q2ooE6GuzQkS80dtw1JILXjFWdfQ3IKkwCLcBGAs/s1600/breaoutplay.png";

var startBtn = document.getElementById('startBtn');

function drawScore() {
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 10, 20);
}

function isWithin(a, b, c) {
    return (a > b && a < c);
}

function drawPlay() {
    context.beginPath();
    context.drawImage(play, 250, 250);
    context.fill();
    clickable;
    context.closePath();
}

function drawRestart() {
    context.beginPath();
    context.drawImage(restart, 250, 250);
    context.fill();
    clickable;
    context.closePath();
}

function checkForCollision() {
    if(isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)) {
        if(isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)) {
            // Respawn new target
            respawn();
            // Increase score
            score += 10;
        }
    };
}

function respawn() {
    targetX = Math.round(Math.random() * canvas.width - targetLength);
    targetY = Math.round(Math.random() * canvas.height - targetLength);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    startBtn.style.display = 'none';

    // Todo : Update location base on keyboard click
    if(down) {
        y += speed;
    } else if(up) {
        y -= speed;
    } else if(right) {
        x += speed;
    } else if(left) {
        x -= speed;
    }

    // keep the square within the border
    if(y + sideLength > canvas.height) {
        y = canvas.height - sideLength;
    }
    if(y < 0) {
        y = 0;
    }
    if(x < 0) {
        x = 0;
    }
    if(x + sideLength > canvas.width) {
        x = canvas.width - sideLength;
    }

    // Draw
    context.fillStyle = "#6FB2B8";
    context.fillRect(x, y, sideLength, sideLength);

    // Draw target
    context.fillStyle = "#B26FB8";
    context.fillRect(targetX, targetY, targetLength, targetLength);

    if(time <= 0){
        alert('Times out');
        document.location.reload();
    } else {
        window.requestAnimationFrame(draw);
    }

    // Display Score
    checkForCollision();
    context.font = "10px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: " + score, 10, 20);

    //Display Time
    context.fillText("Time: " + time, 10, 10);

    
}

setInterval(function() {
    time--;
}, 1000);

canvas.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.key);
    down = false;
    up = false;
    left = false;
    right = false; 
    if(event.key == "ArrowDown") {
        down = true;
    } else if(event.key == "ArrowUp") {
        up = true;
    } else if(event.key == "ArrowLeft") {
        left = true;
    } else if(event.key == "ArrowRight") {
        right = true;
    }
});

drawPlay();
draw();