let input = window.prompt("WARNING this website is AWSOME! Type yes if you agree");

console.log(input);

document.getElementById("p1").innerHTML = "You typed " + input + " in the box";

document.getElementById("submit").onclick = function(){

    a = document.getElementById("a").value;
    console.log(a)
    b = document.getElementById("b").value;
    console.log(b)
    c = document.getElementById("c").value;
    console.log(c)

    test = (-b + Math.sqrt((b * b) -4 * a * c)) / (2 * a)
    console.log(test)

    test1 = (-b - Math.sqrt((b * b) -4 * a * c)) / (2 * a)
    console.log(test1)

    Xvertex = (-b/(2*a))
    console.log(Xvertex)
    Yvertex = a*(Xvertex*Xvertex) + (b*Xvertex) + parseInt(c)
    console.log(Yvertex)
    if (test == test1) {
        document.getElementById("p2").innerHTML = "The root of this function is " + test;
    } else {
        document.getElementById("p2").innerHTML = "The roots of the function are " + test + " and " + test1;
    }

    document.getElementById("p3").innerHTML = "The vertex of the function is on point (" + Xvertex + ", " + Yvertex + ")"
}

