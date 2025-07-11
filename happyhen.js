const canvas = document.getElementById("flappyCanvas");
    const ctx = canvas.getContext("2d");
    const playBtn = document.getElementById("playBtn");

    let birdY, birdVelocity, pipes, frame, score;
    let gameStarted = false;
    const birdX = 50;
    const birdSize = 40;
    const hitboxPadding = 8;

    const gravity = 0.2;
    const flapStrength = -5.5;
    const maxFallSpeed = 4;

    const pipeWidth = 60;
    const pipeGapHeight = 150;
    const pipeSpeed = 1.5;
    const pipeSpawnInterval = 180;

    const penguinImg = new Image();
    penguinImg.src = "happyhen.png";

    function resetGame() {
      birdY = 150;
      birdVelocity = 0;
      pipes = [];
      frame = 0;
      score = 0;
    }

    function drawBird() {
      ctx.drawImage(penguinImg, birdX, birdY, birdSize, birdSize);
    }

    function drawPipe(pipe) {
      ctx.fillStyle = "green";
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapTop);
      ctx.fillRect(pipe.x, pipe.gapTop + pipeGapHeight, pipeWidth, canvas.height);
    }
    function drawScore() {
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    }


    function update() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  birdVelocity += gravity;
  if (birdVelocity > maxFallSpeed) birdVelocity = maxFallSpeed;
  birdY += birdVelocity;

  drawBird();

  // Hitbox
  const birdHitX = birdX + hitboxPadding;
  const birdHitW = birdSize - 2 * hitboxPadding;
  const birdHitY = birdY + hitboxPadding;
  const birdHitH = birdSize - 2 * hitboxPadding;

  // Spawn pipes
  if (frame % pipeSpawnInterval === 0) {
    let gapTop = Math.random() * (canvas.height - pipeGapHeight - 100) + 50;
    pipes.push({ x: canvas.width, gapTop, passed: false });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= pipeSpeed;
    drawPipe(pipes[i]);

    // Collision detection
    if (
      birdHitX + birdHitW > pipes[i].x &&
      birdHitX < pipes[i].x + pipeWidth &&
      (birdHitY < pipes[i].gapTop || birdHitY + birdHitH > pipes[i].gapTop + pipeGapHeight)
    ) {
      alert("Game Over! Score: " + score);
      gameStarted = false;
      playBtn.style.display = "inline-block";
      canvas.style.display = "none";
      return;
    }

    // ✅ Score update
    if (!pipes[i].passed && pipes[i].x + pipeWidth < birdX) {
      pipes[i].passed = true;
      score++;
    }
  }

  // Draw score on screen
  drawScore();

  // Game over if bird hits top/bottom
  if (birdY + birdSize > canvas.height || birdY < 0) {
    alert("Game Over! Score: " + score);
    gameStarted = false;
    playBtn.style.display = "inline-block";
    canvas.style.display = "none";
    return;
  }

  frame++;
  requestAnimationFrame(update);
}


    document.addEventListener("keydown", () => {
      if (gameStarted) birdVelocity = flapStrength;
    });

    playBtn.addEventListener("click", () => {
      resetGame();
      gameStarted = true;
      playBtn.style.display = "none";
      canvas.style.display = "block";
      update();
    });