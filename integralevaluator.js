document.getElementById("submit").addEventListener("click", function () {
  let expr = document.getElementById("antiderivative").value;
  let resultDisplay = document.getElementById("result");

  function parseLimit(input) {
    input = input.toLowerCase()
      .replace(/pi/g, "Math.PI")
      .replace(/π/g, "Math.PI")
      .replace(/\be\b/g, "Math.E");

    input = input.replace(/\^/g, "**");

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

  try {
    let a = parseLimit(document.getElementById("lowerlimit").value);
    let b = parseLimit(document.getElementById("upperlimit").value);

    expr = expr.replace(/\|([^|]+)\|/g, "Math.abs($1)");
    expr = expr.replace(/\^/g, "**");

    const mathFuncs = ["sin", "cos", "tan", "log", "exp", "sqrt"];
    mathFuncs.forEach(fn => {
      const regex = new RegExp(`(?<!\\.)\\b${fn}\\(`, "g");
      expr = expr.replace(regex, `Math.${fn}(`);
    });

    let F = new Function("x", `return ${expr};`);
    let area = F(b) - F(a);

    resultDisplay.textContent = `Area: ${parseFloat(area.toFixed(6))}`;
  } catch (err) {
    resultDisplay.textContent = "Error: " + err.message;
  }
});
