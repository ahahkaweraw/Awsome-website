document.getElementById("submit").onclick = function(){

    const expr = document.getElementById("antiderivative").value;
    const b = document.getElementById("upperlimit").value;
    const a = document.getElementById("lowerlimit").value;

    try {
        if (!expr.trim()) throw new Error("Antiderivative cannot be empty.");
        const node = math.parse(expr);
        const f = node.compile();  // This must succeed
        const fA = f.evaluate({ x: b })
        const fB = f.evaluate({ x: a })
        const area = fA - fB;
        console.log(f)
        document.getElementById("result").innerText = `Area: ${area}`;
    } catch (err) {
        document.getElementById("result").innerText = `Error: ${err.message}`;
    }

}