
let gameOver = false;
let girlRunning = false;

let girl = document.getElementById("girl");
let background = document.querySelector(".back");
let yeti = document.getElementById("yeti");
let logs = document.querySelectorAll(".obstacle");

let collectibles = document.getElementById("collectibles");
let scoreDisplay = document.getElementById("score");
let score = 0;
let snowflakes = [];

// this is to press ENTER to run
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !gameOver) {
        girlRunning = true;
        girl.classList.add("running");
        background.classList.add("moving");
    }
});

// to release ENTER to stop
document.addEventListener("keyup", function(event) {

    if (event.key === "Enter") {
        girlRunning = false;
        girl.classList.remove("running");
        background.classList.remove("moving");
    }
});

// this makes the yeti catch the girl when she is not running or hits smthg
setInterval(function() {
    let currentLeft = parseFloat(getComputedStyle(yeti).left);

    if (gameOver) {
        yeti.style.left = (currentLeft + 32) + "px";
    }
    else if (!girlRunning) {
        yeti.style.left = (currentLeft + 5) + "px";
    }
}, 100);

// this creates new snowflakes
function createSnowflake() {

    let snowflake = document.createElement("div");

    snowflake.classList.add("collectible");
    snowflake.textContent = "❄️";
    snowflake.style.right = "-40px";
    snowflake.style.top = (30 + Math.random() * 50) + "%";
    collectibles.appendChild(snowflake);
    snowflakes.push(snowflake);
}

// this makes new snowflakes appear
setInterval(function() {

    if (!gameOver) {
        createSnowflake();
    }

}, 1500);

// this is used to move all the logs (obastacles)
function moveLog() {

    logs.forEach(function(log) {
        let currentRight = parseFloat(getComputedStyle(log).right);
        log.style.right = (currentRight + 5) + "px";
    });

    snowflakes.forEach(function(snowflake) {
        let currentRight = parseFloat(getComputedStyle(snowflake).right);
        snowflake.style.right = (currentRight + 5) + "px";
    });

    requestAnimationFrame(moveLog);
}
moveLog();

// this makes thegirl jump with SPACE or ARROW UP
document.addEventListener("keydown", function(event) {

    if (event.code === "Space" || event.code === "ArrowUp") {
        if (!gameOver) {
            girl.classList.add("jump");
        }
        event.preventDefault();
    }
});

// this makes the girl stop jumping
document.addEventListener("keyup", function(event) {

    if (event.code === "Space" || event.code === "ArrowUp") {
        girl.classList.remove("jump");
    }
});

// this makes the girl move left and right
document.addEventListener("keydown", function(event) {

    let currentLeft = parseFloat(getComputedStyle(girl).left);

    if (event.key === "ArrowLeft" && !gameOver) {
        girl.style.left = Math.max(0, currentLeft - 20) + "px";
        event.preventDefault();
    }

    if (event.key === "ArrowRight" && !gameOver) {
        girl.style.left = Math.min(
            document.querySelector(".game").clientWidth - girl.offsetWidth,
            currentLeft + 20
        ) + "px";
        event.preventDefault();
    }
});

// this is to check collision with all obstacles
function checkCollision() {

    let girlBox = girl.getBoundingClientRect();

    logs.forEach(function(log) {
        let logBox = log.getBoundingClientRect();

        if (
            girlBox.right > logBox.left &&
            girlBox.left < logBox.right &&
            girlBox.bottom > logBox.top &&
            girlBox.top < logBox.bottom &&
            !gameOver
        ) {
            gameOver = true;
            girlRunning = false;
            girl.classList.remove("running");
            background.classList.remove("moving");
            console.log("The Yeti is coming!");
        }
    });

    // this is for the collectibles
    snowflakes.forEach(function(snowflake) {

        let snowflakeBox = snowflake.getBoundingClientRect();
        if (
            girlBox.right > snowflakeBox.left &&
            girlBox.left < snowflakeBox.right &&
            girlBox.bottom > snowflakeBox.top &&
            girlBox.top < snowflakeBox.bottom
        ) {
            score++;
            scoreDisplay.textContent = score;
            snowflake.remove();
            snowflakes = snowflakes.filter(function(item) {
                return item !== snowflake;
            });
        }

        // this removes a point when a snowflake is missed
        else if (
            snowflakeBox.right < document.querySelector(".game").getBoundingClientRect().left
        ) {
            score--;
           scoreDisplay.textContent = score;
            snowflake.remove();
            snowflakes = snowflakes.filter(function(item) {
                return item !== snowflake;
            });
        }
    });
    requestAnimationFrame(checkCollision);
}
checkCollision();
