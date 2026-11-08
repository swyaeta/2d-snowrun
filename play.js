let gameOver = false;
let girlRunning = false;

let girl = document.getElementById("girl");
let background = document.querySelector(".back");
let yeti = document.getElementById("yeti");

// Press ENTER to run
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !gameOver) {

        girlRunning = true;

        girl.classList.add("running");
        background.classList.add("moving");

    }

});

// Release ENTER to stop
document.addEventListener("keyup", function(event) {

    if (event.key === "Enter") {

        girlRunning = false;

        girl.classList.remove("running");
        background.classList.remove("moving");

    }

});

// Yeti approaches when girl stops
setInterval(function() {

    if (!girlRunning && !gameOver) {

        let currentLeft = parseFloat(getComputedStyle(yeti).left);

        yeti.style.left = (currentLeft + 5) + "px";

    }

}, 100);


let log = document.getElementById("log");

function moveLog() {
    let currentRight = parseFloat(getComputedStyle(log).right);

    log.style.right = (currentRight + 5) + "px";

    requestAnimationFrame(moveLog);
}

moveLog();

document.addEventListener("keydown", function(event) {

    if (event.code === "Space" || event.code === "ArrowUp") {

        if (!gameOver) {
            girl.classList.add("jump");
        }

        event.preventDefault();
    }

});

document.addEventListener("keyup", function(event) {

    if (event.code === "Space" || event.code === "ArrowUp") {
        girl.classList.remove("jump");
    }

});

function checkCollision() {

    let girlBox = girl.getBoundingClientRect();
    let logBox = log.getBoundingClientRect();

    if (
        girlBox.right > logBox.left &&
        girlBox.left < logBox.right &&
        girlBox.bottom > logBox.top &&
        girlBox.top < logBox.bottom
    ) {
        gameOver = true;

        girl.classList.remove("running");
        background.classList.remove("moving");

        console.log("The Yeti is coming!");
    }

    requestAnimationFrame(checkCollision);
}

checkCollision();