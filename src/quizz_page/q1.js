
let currentRound = 0;
let score = 0;
let streak = 0;
let gameActive = false;

const imageList = [
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/colors.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/eyes.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/higurama.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/jjk.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/lake.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/night_city.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/nika.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/ocean.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/rainbow_eyes.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/room.png', answer: "png" },
    { url: 'https://quiz.k1mch1.space/png-vs-jpg/sky.png', answer: "png" }
];


function gamestart() {
    console.log("Game Started!");
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');
    
    // Reset stats
    currentRound = 0;
    score = 0;
    streak = 0;
    updateStats();
    
    gameActive = true;
    showNextImage();
}

function goToMenu() {
    document.getElementById('game-area').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    gameActive = false;
}


function showNextImage() {
    const myFrame = document.getElementById('quiz-image');
    const statusText = document.getElementById('status-text');
    const feedbackPanel = document.getElementById('feedback');

    // Check if game is over
    if (currentRound >= imageList.length) {
        statusText.textContent = "Game Over!";
        myFrame.style.display = 'none'; //
        feedbackPanel.innerHTML = `<h3>Finished!</h3><p>Final Score: ${score}</p>`;
        return;
    }

    myFrame.src = imageList[currentRound].url;
    
    // Reset status text
    statusText.textContent = "Is this a JPEG or a PNG?";
    feedbackPanel.textContent = "";
}

function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('current-round').textContent = currentRound + 1;
    document.getElementById('streak').textContent = streak;
}

// --- FIXED makeGuess Function ---
function makeGuess(guess) {
    if (!gameActive) return;

    const currentImage = imageList[currentRound];
    const feedbackPanel = document.getElementById('feedback');
    const statusText = document.getElementById('status-text');

    if (guess === currentImage.answer) {
        // Correct
        score += 100;
        streak++;
        feedbackPanel.style.color = "green";
        feedbackPanel.textContent = "Correct! It is a " + currentImage.answer.toUpperCase();
    } else {
        // Wrong
        streak = 0;
        feedbackPanel.style.color = "red";
        feedbackPanel.textContent = "Wrong! It was a " + currentImage.answer.toUpperCase();
    }

    updateStats();

    // Wait 1.5 seconds then go to next image
    setTimeout(() => {
        currentRound++;
        showNextImage();
    }, 1500);
}

// --- Game Object Links ---
const game = {
    start: gamestart,       
    goToMenu: goToMenu,     
    makeGuess: makeGuess    
};
