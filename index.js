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

    document.getElementById("p2").innerHTML = "Your answer is " + test + " or " + test1
}


