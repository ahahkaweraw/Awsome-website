let cookie = 0;
let MCookie;
let hasShownPopup = false;
const points = [];

const canvas = document.getElementById("cookieCanvas");
const ctx = canvas.getContext("2d");

// Draw the coordinate plane with grid and ticks
function drawCoordinatePlane() {
  const width = canvas.width;
  const height = canvas.height;
  const maxY = 4000;
  const tickIntervalY = 200;

  ctx.clearRect(0, 0, width, height);

  // Draw X and Y axes
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  // X-axis
  ctx.beginPath();
  ctx.moveTo(0, height - 20);
  ctx.lineTo(width, height - 20);
  ctx.stroke();

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(20, height);
  ctx.stroke();

  // Gridlines and Y ticks
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#000";
  ctx.font = "12px sans-serif";

  for (let j = 0; j <= maxY; j += tickIntervalY) {
    const y = height - 20 - (j / maxY) * (height - 40);

    // Grid line
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    // Tick mark
    ctx.beginPath();
    ctx.moveTo(15, y);
    ctx.lineTo(20, y);
    ctx.stroke();

    // Label to the left of the line
    ctx.fillText(j, 0, y - 2);
  }

  // X-axis ticks every 10 clicks
  for (let i = 0; i <= (width - 40) / 5; i += 10) {
    const x = i * 5 + 20;
    ctx.fillText(i, x, height - 5);
  }
}

// Draw all recorded points
function drawPoints() {
  ctx.fillStyle = "blue";
  for (const pt of points) {
    const x = pt.x * 5 + 20;
    const y = canvas.height - 20 - (pt.y / 4000) * (canvas.height - 40);

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Show the popup message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "absolute";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "white";
  popup.style.border = "2px solid black";
  popup.style.padding = "20px";
  popup.style.zIndex = "1000";
  popup.style.fontSize = "24px";
  popup.style.fontWeight = "bold";
  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}

// Update label
function updateDisplay() {
  const label = document.getElementById("Counter");
  if (MCookie <= 1_000_000) {
    label.innerText = `You have ${MCookie} cookies.`;
  } else if (MCookie <= 10_000_000_000) {
    label.innerText = `You have ${MCookie.toExponential(2)} cookies.`;
  } else {
    label.innerText = `You have ${MCookie.toExponential(2)} cookies.`;
  }
}

// On click
document.getElementById("Clicker").onclick = function () {
  cookie++;
  MCookie = cookie ** 2;
  points.push({ x: cookie, y: MCookie });

  updateDisplay();
  drawCoordinatePlane();
  drawPoints();

  if ((cookie === 64 || MCookie === 4096) && !hasShownPopup) {
    showPopup("Congrats!!! You just created half of a Parabola!");
    hasShownPopup = true;
  }
};

// Initialize graph
drawCoordinatePlane();
