function insertMultiplication(input) {
  // Insert * between number and variable or '('
  input = input.replace(/(\d)([a-zA-Z\(])/g, '$1*$2');
  // Insert * between variable and variable or '('
  input = input.replace(/([a-zA-Z])([a-zA-Z\(])/g, '$1*$2');
  return input;
}

function parseLimit(input) {
  input = input.toLowerCase();

  // Insert implied multiplication in limits
  input = insertMultiplication(input);

  // Replace constants
  input = input.replace(/pi/g, "Math.PI")
               .replace(/π/g, "Math.PI")
               .replace(/\be\b/g, "Math.E");

  // Replace ^ with **
  input = input.replace(/\^/g, "**");

  // Add Math. to functions
  const mathFuncs = ["sin", "cos", "tan", "log", "exp", "sqrt", "abs"];
  mathFuncs.forEach(fn => {
    const regex = new RegExp(`(?<!\\.)\\b${fn}\\(`, "g");
    input = input.replace(regex, `Math.${fn}(`);
  });

  try {
    return new Function(`return ${input};`)();
  } catch {
    throw new Error("Invalid limit expression");
  }
}

document.getElementById("submit").addEventListener("click", function () {
  let expr = document.getElementById("antiderivative").value;
  let resultDisplay = document.getElementById("result");

  try {
    // Insert implied multiplication in expression
    expr = insertMultiplication(expr);

    // Replace absolute value bars
    expr = expr.replace(/\|([^|]+)\|/g, "Math.abs($1)");

    // Replace ^ with **
    expr = expr.replace(/\^/g, "**");

    // Add Math. to math functions
    const mathFuncs = ["sin", "cos", "tan", "log", "exp", "sqrt"];
    mathFuncs.forEach(fn => {
      const regex = new RegExp(`(?<!\\.)\\b${fn}\\(`, "g");
      expr = expr.replace(regex, `Math.${fn}(`);
    });

    // Parse limits
    let a = parseLimit(document.getElementById("lowerlimit").value);
    let b = parseLimit(document.getElementById("upperlimit").value);

    // Create function and evaluate area
    let F = new Function("x", `return ${expr};`);
    let area = F(b) - F(a);

    resultDisplay.textContent = `Area: ${parseFloat(area.toFixed(6))}`;
  } catch (err) {
    resultDisplay.textContent = "Error: " + err.message;
  }
});
