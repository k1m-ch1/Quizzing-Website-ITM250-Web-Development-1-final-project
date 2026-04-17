var score = 0;

function showPage(id) {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('q1').style.display = 'none';
    document.getElementById('q2').style.display = 'none';
    document.getElementById('q3').style.display = 'none';
    document.getElementById('q4').style.display = 'none';
    document.getElementById('q5').style.display = 'none';
    document.getElementById('result').style.display = 'none';

    document.getElementById(id).style.display = 'block';
}

// Checks the selected answer for a question, updates score and feedback, and navigates to the next page or results.
function checkAnswer(questionName, feedbackId, nextPageId) {
    var selected = document.querySelector('input[name="' + questionName + '"]:checked');
    var feedback = document.getElementById(feedbackId);

    if (selected === null) {
        feedback.textContent = 'Please select an answer first.';
        return;
    }

    if (selected.value === 'correct') {
        score = score + 1;
        feedback.textContent = 'Correct!';
        if (nextPageId === 'result') {
            showResult();
        } else {
            showPage(nextPageId);
        }
    } else {
        feedback.textContent = 'Wrong! Moving to results...';
        showResult();
    }
}

// Displays the final score and a message based on the user's performance.
function showResult() {
    document.getElementById('score').textContent = score;

    if (score === 5) {
        document.getElementById('result-msg').textContent = 'Perfect score! You know your flags!';
    } else if (score >= 3) {
        document.getElementById('result-msg').textContent = 'Good effort! Keep practising.';
    } else {
        document.getElementById('result-msg').textContent = 'Better luck next time!';
    }

    showPage('result');
}

// Resets the quiz to its initial state, clearing selections, feedback, and score, and shows the instructions page.
function restartQuiz() {
    score = 0;

    var r1 = document.querySelector('input[name="q1"]:checked');
    if (r1 !== null) { r1.checked = false; }

    var r2 = document.querySelector('input[name="q2"]:checked');
    if (r2 !== null) { r2.checked = false; }

    var r3 = document.querySelector('input[name="q3"]:checked');
    if (r3 !== null) { r3.checked = false; }

    var r4 = document.querySelector('input[name="q4"]:checked');
    if (r4 !== null) { r4.checked = false; }

    var r5 = document.querySelector('input[name="q5"]:checked');
    if (r5 !== null) { r5.checked = false; }

    document.getElementById('fb1').textContent = '';
    document.getElementById('fb2').textContent = '';
    document.getElementById('fb3').textContent = '';
    document.getElementById('fb4').textContent = '';
    document.getElementById('fb5').textContent = '';

    showPage('instructions');
}

showPage('instructions');