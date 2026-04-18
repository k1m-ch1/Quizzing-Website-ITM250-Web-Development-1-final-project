
let correctAnswers = 0;
let answeredQuestions = 0;

function checkAnswer(questionName, feedbackId){
  let totalQuestions = document.querySelectorAll(".quiz-question").length;
  let selected = document.querySelector(`input[name="${questionName}"]:checked`);
  let feedback = document.getElementById(feedbackId);

  if (selected === null) {
    feedback.textContent = 'Please select an answer first.';
    return;
  }

  answeredQuestions++;


  if (selected.value === "true"){
    correctAnswers++;
    feedback.textContent = "Correct!";
    selected.closest("label").classList.add("success");
  }
  else {
    feedback.textContent = "Incorrect!";
    selected.closest("label").classList.add("error");
    let correct = document.querySelector(`input[name="${questionName}"][value="true"]`)
    correct.closest("label").classList.add("success");
  }

  // disable all radio button after submission
  let possibleAnswers = document.querySelectorAll(`input[name="${questionName}"]`);
  possibleAnswers.forEach(input => {
    input.disabled = true;
  });

  // also disable the submit button (a bit scuff)
  selected.closest("label").parentElement.parentElement.querySelector('button').disabled = true;

  // show the result if all questions have been answered
  if (answeredQuestions === totalQuestions){
    const quizResultSection = `
    <section class="quiz-card quiz-result">
        <h2>Quiz Complete!</h2>
        <p>Your score: <strong id="score">${correctAnswers}</strong> / ${totalQuestions}</p>
        <button onclick="location.reload()">Try Again</button>
        <a href="/index.html">Home</a>
    </section>
    `

    document.querySelector('.quiz-main').innerHTML += quizResultSection;
  }
}
