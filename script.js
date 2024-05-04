// Configurações do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerWidth = 50;
const playerHeight = 50;
const obstacleWidth = 20;
const obstacleHeight = 20;
const initialObstacleSpeed = 5;
let obstacleSpeed = initialObstacleSpeed;
let score = 0;
let lives = 3;
let playerYVelocity = 0; // Velocidade vertical do jogador

let playerX = canvas.width / 4;
let playerY = canvas.height / 2;
let obstacles = [];

// Função para desenhar o jogador
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Função para desenhar os obstáculos
function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
}

// Função para mover os obstáculos
function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= obstacleSpeed;
    });
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacleWidth > 0);
}

// Função para gerar obstáculos
function generateObstacle() {
    const obstacleY = Math.random() * (canvas.height - obstacleHeight);
    obstacles.push({ x: canvas.width, y: obstacleY });
}

// Função para desenhar a pontuação
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Função para desenhar as vidas
function drawLives() {
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Lives: ' + lives, canvas.width - 100, 30);
}

// Função para desenhar na tela
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawScore();
    drawLives();
}

// Função para atualizar o jogo
function update() {
    moveObstacles();
    checkCollisions();
    updatePlayerPosition();
    draw();
    requestAnimationFrame(update);
}

// Função para verificar colisões
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (
            playerX < obstacle.x + obstacleWidth &&
            playerX + playerWidth > obstacle.x &&
            playerY < obstacle.y + obstacleHeight &&
            playerY + playerHeight > obstacle.y
        ) {
            // Colisão detectada
            lives--;
            if (lives === 0) {
                alert('Game Over! Your score: ' + score);
                document.location.reload();
            }
        }
    });
}

// Função para atualizar a posição do jogador
function updatePlayerPosition() {
    playerY += playerYVelocity;
    // Limita o jogador dentro dos limites da tela
    if (playerY < 0) {
        playerY = 0;
    } else if (playerY > canvas.height - playerHeight) {
        playerY = canvas.height - playerHeight;
    }
}

// Função para fazer o jogador saltar
function jump() {
    playerYVelocity = -10 - Math.floor(score / 5); // Define a velocidade de salto com base na pontuação
}

// Função para fazer o jogador retornar
function returnPlayer() {
    playerYVelocity = 10 + Math.floor(score / 5); // Define a velocidade de retorno com base na pontuação
}

// Event listener para capturar as teclas pressionadas
document.addEventListener('keydown', event => {
    if (event.code === 'ArrowUp') {
        jump();
    } else if (event.code === 'ArrowDown') {
        returnPlayer();
    }
});

// Define intervalos para gerar obstáculos, verificar colisões e atualizar o jogo
setInterval(generateObstacle, 2000);
setInterval(updateScore, 1000); // Atualiza a pontuação a cada segundo
update();

// Função para atualizar a pontuação
function updateScore() {
    score++;
    if (score % 5 === 0) {
        obstacleSpeed += 0.5; // Aumenta a velocidade dos obstáculos a cada 5 pontos
    }
}
