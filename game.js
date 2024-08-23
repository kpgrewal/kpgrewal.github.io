// Game variables
const basket = document.getElementById('basket');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startButton = document.getElementById('startGame');
const gameContainer = document.getElementById('gameContainer');

let score = 0;
let lives = 3;
let basketWidth = basket.offsetWidth;
let ballSize = ball.offsetWidth;
let basketX = (gameContainer.offsetWidth - basketWidth) / 2;
let basketXPos = (gameContainer.offsetWidth - basketWidth) / 2;
let ballInterval;
let ballSpeed = 2; // Initial speed
let ballX = Math.random() * (gameContainer.offsetWidth - ballSize);

// Function to update the ball speed based on the score
function updateBallSpeed() {
    ballSpeed = 2 + Math.floor(score / 50); // Increase speed every 50 points
}

// Function to start the game
function startGame() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    startButton.style.display = 'none'; // Hide the start button
    dropBall(); // Start the game loop
}

// Move basket based on arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && basketXPos > 0) {
        basketXPos -= 20;
    } else if (event.key === 'ArrowRight' && basketXPos < gameContainer.offsetWidth - basketWidth) {
        basketXPos += 20;
    }
    basket.style.left = `${basketXPos}px`;
});

// Ball falling logic
function dropBall() {
    ballX = Math.random() * (gameContainer.offsetWidth - ballSize);
    ball.style.left = `${ballX}px`;
    ball.style.top = '0px';
    let ballY = 0;

    ballInterval = setInterval(() => {
        ballY += ballSpeed;
        ball.style.top = `${ballY}px`;

        // Check if the ball is caught by the basket
        if (
            ballY >= gameContainer.offsetHeight - basket.offsetHeight - ballSize &&
            ballX + ballSize > basketXPos &&
            ballX < basketXPos + basketWidth
        ) {
            clearInterval(ballInterval);
            score += 10;
            updateBallSpeed(); // Update ball speed based on new score
            scoreDisplay.textContent = `Score: ${score}`;
            dropBall(); // Drop a new ball
        }

        // Check if the ball is missed
        if (ballY > gameContainer.offsetHeight) {
            clearInterval(ballInterval);
            lives -= 1;
            livesDisplay.textContent = `Lives: ${lives}`;
            if (lives > 0) {
                dropBall(); // Drop a new ball if lives remain
            } else {
                endGame(); // End the game if no lives are left
            }
        }
    }, 20);
}

// End the game
function endGame() {
    alert(`Game Over! Your final score is ${score}`);
    startButton.style.display = 'block'; // Show the start button
}

// Start button event listener
startButton.addEventListener('click', startGame);
