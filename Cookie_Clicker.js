let cookie = 0; // Initialize cookie count
let MCookie; // Variable to hold modified cookie count
const canvas = document.getElementById("cookieCanvas");
const ctx = canvas.getContext("2d");

// Function to draw the coordinate plane
function drawCoordinatePlane() {
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, width, height);

    // Draw X-axis
    ctx.strokeStyle = "#000"; // Color for the axes
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - 20); // X-axis at the bottom
    ctx.lineTo(width, height - 20); // Draw to the right
    ctx.stroke();

    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(20, 0); // Y-axis on the left side
    ctx.lineTo(20, height); // Draw up
    ctx.stroke();

    // Draw horizontal grid lines and ticks for Y-axis
    const maxYTickValue = 4000; // Set maximum Y tick value (increase as necessary)
    const tickInterval = 200; // Interval between ticks

    ctx.strokeStyle = "#e0e0e0"; // Light gray for grid lines
    ctx.lineWidth = 1;

    // Draw horizontal grid lines and ticks for Y-axis
    for (let j = 0; j <= maxYTickValue; j += tickInterval) {
        const scaledY = height - (j / maxYTickValue) * (height - 40); // Invert for Y-axis

        // Draw horizontal grid line
        ctx.beginPath();
        ctx.moveTo(20, scaledY); // Start at the left
        ctx.lineTo(width, scaledY); // End at the right
        ctx.stroke();

        // Draw tick mark on Y-axis behind the Y-axis line
        ctx.beginPath();
        ctx.moveTo(15, scaledY); // Tick mark on Y-axis
        ctx.lineTo(20, scaledY); // Longer tick mark
        ctx.stroke();

        // Label the ticks to the left of the gridline, positioned directly above the previous gridline
        ctx.fillStyle = "#000"; // Color for text
        ctx.fillText(j, 5, scaledY - 15); // Move it up one position from the grid line
    }

    // Draw labels for the X-axis
    for (let i = 0; i <= (width - 20) / 50; i++) {
        ctx.fillText(i * 10, i * 50 + 20, height - 5); // X-axis labels
    }
}

// Function to update the cookie counter and message
function updateDisplay() {
    if (MCookie <= 1_000_000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie + " cookies.";
        document.getElementById("p4").innerHTML = "They taste awful but this is just the beginning.";
    } else if (MCookie > 1_000_000 && MCookie < 10_000_000_000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie.toExponential(2) + " cookies.";
        document.getElementById("p4").innerHTML = "Your cookies are improving.";
    } else if (MCookie >= 10_000_000_000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie.toExponential(2) + " cookies.";
        document.getElementById("p4").innerHTML = "Your cookies taste AMAZING!!! Everyone in town is enjoying your cookies!";
    }
}

// Function to plot points on the canvas
function plotPoint() {
    const x = cookie; // Number of clicks (X-coordinate)
    const y = MCookie; // Total cookies (Y-coordinate)

    // Calculate scaled coordinates to fit the canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Scale the coordinates
    const scaledX = x * 5 + 20; // Scale for X-axis
    const scaledY = canvasHeight - (y / 4000) * (canvasHeight - 40) - 20; // Invert for Y-axis

    // Ensure the point fits in the canvas
    if (scaledX >= 20 && scaledX <= canvasWidth && scaledY >= 0 && scaledY <= canvasHeight - 20) {
        ctx.fillStyle = "blue"; // Set point color
        ctx.beginPath();
        ctx.arc(scaledX, scaledY, 3, 0, Math.PI * 2); // Draw point
        ctx.fill();

        // Show the pop-up message only when conditions are met
        if (cookie === 64 || MCookie === 4096) {
            showPopup("Congrats!!! You just created half of a Parabola!");
        }
    }
}

// Function to display a pop-up message
function showPopup(message) {
    const popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    popup.style.border = "2px solid #000";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.fontSize = "24px";
    popup.style.textAlign = "center";
    document.body.appendChild(popup);

    // Remove the pop-up after 1 second
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 4000);
}

// Event handler for the clicker button
document.getElementById("Clicker").onclick = function() {
    cookie += 1; // Increment cookie count (number of clicks)
    MCookie = cookie ** 2; // Calculate modified cookie count
    updateDisplay(); // Update the display based on the cookie count
    plotPoint(); // Plot the point on the graph
};

// Initialize display on page load
drawCoordinatePlane(); // Draw the coordinate plane
updateDisplay(); // Update the display
