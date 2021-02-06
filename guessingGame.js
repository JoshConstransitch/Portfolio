window.onload = function() {

    // Declare game variables
    let playing = false;
    let attempts = 0;
    const maxAttempts = 6;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let randomeNumber;
    let duration;
    let history = [];

    // Select document objects

    const input = document.getElementById("guess");
    const feedBack = document.getElementById("feedback");
    const attemptsP = document.getElementById("attempts");
    const historyP = document.getElementById("history");
    const clockP = document.getElementById("clock");
    const guessBtn = document.getElementById("guessBtn");
    const resetBtn = document.getElementById("resetBtn")

    guessBtn.addEventListener("click", startGame);
    resetBtn.addEventListener("click", resetGame);

    function startGame() {
        randomeNumber = Math.floor(Math.random() * 100) + 1;
        playing = true;
        guessBtn.textContent = "Guess";
        input.disabled = false;

        guessBtn.removeEventListener("click", startGame);
        guessBtn.addEventListener("click", guess);

        duration = setInterval(clock, 1000);

        function clock() {
            if (playing) {
                seconds++;
            }
            if (seconds > 59) {
                seconds = 0;
                minutes++;
            } else if (minutes > 59) {
                seconds = 0;
                minutes = 0;
                hours++;
            } else if (hours > 24) {
                clearInterval(duration);
            }

            clockP.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

        }
    }

    function guess() {
        if (playing) {
            giveFeedback(parseInt(input.value));
        }
    }

    function giveFeedback(guess) {
        attempts++;
        attemptsP.textContent = attempts;
        //Check if input is a number and in range
        if (guess < 1 || guess > 100 || isNaN(guess)) {
            feedBack.textContent = "Invalid, Please inter a whole number";
        } else {
            if (randomeNumber > guess) {
                feedBack.textContent = "Too Low";
            } else if (randomeNumber < guess) {
                feedBack.textContent = "Too High";
            } else {
                feedBack.textContent = "Congrats!";
                playing = false;
                clearInterval(duration);
                guessBtn.disabled = true;
                input.disabled = true;
            }
        }

        //Reset input
        input.value = "";
        input.focus();
    }


    function resetGame() {
        clearInterval(duration);
        guessBtn.removeEventListener("click", guess);
        clockP.textContent = "00:00:00";
        seconds = 0;
        minutes = 0;
        hours = 0;
        feedBack.textContent = "Begin Game";
        playing = false;
        attempts = 0;
        attemptsP.textContent = "-";
        input.disabled = true;

        guessBtn.disabled = false;
        guessBtn.textContent = "Start";
        guessBtn.addEventListener("click", startGame);
    }
};