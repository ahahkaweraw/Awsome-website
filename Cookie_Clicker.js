let Cookie = 0;
let Clicker = document.getElementById("Clicker").onclick = function(){
    Cookie+=1;
    document.getElementById("Counter").innerHTML = "You have " + Cookie + " cookies"
}   