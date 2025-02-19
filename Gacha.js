let rollcount = 0;
let dragon = 0
document.getElementById("gamble").onclick = function() {
    rollcount += 1;
    let gacha = Math.floor(Math.random() * 2000) + 1;
    if (gacha == 2000) {
        dragon += 1;
        document.getElementById("stuff").innerHTML = "You rolled a DRAGON!!!"
        document.getElementById("dragon").innerHTML = "You have rolled " + dragon + " dragon(s)."
        showPopup("DRAGONNNN!!!!!!");
    } else {
        document.getElementById("stuff").innerHTML = "You rolled a rocket :("
    }
    console.log(gacha);
    document.getElementById("rollcount").innerHTML = "You have rolled " + rollcount + " times."
}
function showPopup(message) {
    const popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "absolute";
    popup.style.top = "23%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    popup.style.border = "2px solid #000";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.fontSize = "100px";
    popup.style.textAlign = "center";
    document.body.appendChild(popup);

    // Remove the pop-up after 1 second
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 4000);
}