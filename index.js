document.addEventListener("DOMContentLoaded", function() {
    // User prompt for initial message
    let input = window.prompt("WARNING this website is AWESOME! Type yes if you agree");
    console.log(input);
    document.getElementById("p1").innerHTML = "You typed " + input + " in the box";

    // Initialize the coordinate plane
    drawCoordinatePlane();

    // Button click event handler
    document.getElementById("submit").onclick = function() {
        const A = parseFloat(document.getElementById('a').value);
        const B = parseFloat(document.getElementById('b').value);
        const C = parseFloat(document.getElementById('c').value);

        // Check for valid numbers
        if (isNaN(A) || isNaN(B) || isNaN(C)) {
            alert("Please enter valid numbers for A, B, and C");
            return;
        }

        // Calculate the roots using the quadratic formula
        const discriminant = (B ** 2) - 4 * A * C;
        const root1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const root2 = (-B - Math.sqrt(discriminant)) / (2 * A);

        // Calculate the vertex
        const Xvertex = -B / (2 * A);
        const Yvertex = A * (Xvertex ** 2) + B * Xvertex + C;

        // Display the roots and vertex information
        if (discriminant > 0) {
            document.getElementById("p2").innerHTML = "The roots of the function are " + root1 + " and " + root2;
        } else if (discriminant === 0) {
            document.getElementById("p2").innerHTML = "The root of this function is " + root1;
        } else {
            document.getElementById("p2").innerHTML = "There are no real roots.";
        }
        document.getElementById("p3").innerHTML = "The vertex of the function is at (" + Xvertex + ", " + Yvertex + ")";

        // Plot the quadratic function on the canvas
        plotQuadratic(A, B, C);
    }

    // Function to draw the coordinate plane with axes and ticks
    function drawCoordinatePlane() {
        let canvas = document.getElementById('coordinatePlane');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 10;

        // Fill the canvas with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the coordinate plane with tick marks
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Add tick marks
        ctx.font = '10px Arial';
        ctx.fillStyle = 'black';
        for (let x = -250; x <= 250; x += 50) {
            ctx.moveTo(centerX + x, centerY - 5);
            ctx.lineTo(centerX + x, centerY + 5);
            ctx.stroke();
            ctx.fillText((x / scale).toFixed(0), centerX + x - 5, centerY + 15);
        }
        for (let y = -250; y <= 250; y += 50) {
            ctx.moveTo(centerX - 5, centerY + y);
            ctx.lineTo(centerX + 5, centerY + y);
            ctx.stroke();
            if (y !== 0) {
                ctx.fillText((-y / scale).toFixed(0), centerX + 10, centerY + y + 5);
            }
        }
    }

    // Calculate y-value based on quadratic equation
    function calculateY(A, B, C, x) {
        return A * x * x + B * x + C;
    }

    // Plot the quadratic curve
    function plotQuadratic(A, B, C) {
        let canvas = document.getElementById('coordinatePlane');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 10;

        // Clear the previous graph
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Redraw the coordinate plane
        drawCoordinatePlane();

        // Plot the quadratic curve
        ctx.beginPath();
        for (let x = -250; x <= 250; x += 1) {
            const y = calculateY(A, B, C, x / scale);
            ctx.lineTo(centerX + x, centerY - y * scale);
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label the roots and vertex if they exist
        const discriminant = (B ** 2) - 4 * A * C;
        if (discriminant >= 0) {
            labelPoint(root1, 0, `Root (${root1.toFixed(2)}, 0)`);
            if (root1 !== root2) {
                labelPoint(root2, 0, `Root (${root2.toFixed(2)}, 0)`);
            }
        }

        // Label the vertex
        labelPoint(Xvertex, Yvertex, `Vertex (${Xvertex.toFixed(2)}, ${Yvertex.toFixed(2)})`);
    }

    // Function to label a point on the canvas
    function labelPoint(x, y, label) {
        let canvas = document.getElementById('coordinatePlane');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 10;
        const canvasX = centerX + x * scale;
        const canvasY = centerY - y * scale;
        ctx.fillStyle = 'blue';
        ctx.font = '12px Arial';
        ctx.fillText(label, canvasX + 5, canvasY - 5);
    }
});
