let Cookie = 0;
let MCookie
let Clicker = document.getElementById("Clicker").onclick = function(){
    Cookie+=1;
    MCookie = Cookie**2
    console.log(Cookie)
    if(MCookie <= 1000000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie + " cookies."
        document.getElementById("p4").innerHTML = "They taste awful but this is just the beginning."
    } else if(MCookie >= 1000000 && MCookie>= 100000000000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie.toExponential(2) + " cookies."
        document.getElementById("p4").innerHTML = "You're cookies are improving."
    } else if(MCookie >= 10000000000) {
        document.getElementById("Counter").innerHTML = "You have " + MCookie.toExponential(2) + " cookies."
        document.getElementById("p4").innerHTML = "You're cookies taste AMAZING!!! Everyone in the town are enjoying your cookies!"
    }
}
