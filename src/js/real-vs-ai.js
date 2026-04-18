var score = 0;
var totalQuestions = 10; 

function showPage(id) {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('q1').style.display = 'none';
    document.getElementById('q2').style.display = 'none';
    document.getElementById('q3').style.display = 'none';
    document.getElementById('q4').style.display = 'none';
    document.getElementById('q5').style.display = 'none';
    document.getElementById('q6').style.display = 'none';
    document.getElementById('q7').style.display = 'none';
    document.getElementById('q8').style.display = 'none';
    document.getElementById('q9').style.display = 'none';
    document.getElementById('q10').style.display = 'none';
    document.getElementById('result').style.display = 'none';

    document.getElementById(id).style.display = 'block';
}

function checkAnswer(questionName, feedbackId, nextPageId) {
    var selected = document.querySelector('input[name="' + questionName + '"]:checked');
    var feedback = document.getElementById(feedbackId);

    if (selected === null) {
        feedback.textContent = 'Please select an answer first.';
        return;
    }

    
    if (selected.value === 'correct') {
        score = score + 1; 
        feedback.textContent = 'Correct! You have a sharp eye.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Incorrect! You need to try again later.';
        feedback.style.color = 'red';
    }

    
    setTimeout(function() {
        if (nextPageId === 'result') {
            showResult();
        } else {
            showPage(nextPageId);
        }
    }, 800); 
}

function showResult() {
    document.getElementById('score').textContent = score;

    if (score === 10) {
        document.getElementById('result-msg').textContent = 'Perfect score! You are immune to AI deception!';
    } else if (score >= 5) {
        document.getElementById('result-msg').textContent = 'Good effort! Some of those AI fakes are getting really good.';
    } else {
        document.getElementById('result-msg').textContent = 'You need to train your eyes more with AI! Better luck next time.';
    }

    showPage('result');
}

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

    var r6 = document.querySelector('input[name="q6"]:checked');
    if (r6 !== null) { r6.checked = false; }

    var r7 = document.querySelector('input[name="q7"]:checked');
    if (r7 !== null) { r7.checked = false; }

    var r8 = document.querySelector('input[name="q8"]:checked');
    if (r8 !== null) { r8.checked = false; }

    var r9 = document.querySelector('input[name="q9"]:checked');
    if (r9 !== null) { r9.checked = false; }

    var r10 = document.querySelector('input[name="q10"]:checked');
    if (r10 !== null) { r10.checked = false; }

    
    var feedbackIds = ['fb1', 'fb2', 'fb3', 'fb4', 'fb5', 'fb6', 'fb7', 'fb8', 'fb9', 'fb10'];
    feedbackIds.forEach(function(id) {
        var fb = document.getElementById(id);
        fb.textContent = '';
        fb.style.color = ''; 
    });

    showPage('instructions');
}

showPage('instructions');