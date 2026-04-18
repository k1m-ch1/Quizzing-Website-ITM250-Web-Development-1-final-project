function getQuizName(){
  /*
   * We're assuming that we're storing quizzes as /quiz-pages/quiz-name
   * quizName also has dashes to replace spaces
  */

  const path = window.location.pathname;
  const splitted = path.split('/');
  quizName = splitted[splitted.length - 2];
  return quizName;
}

async function prepareQuiz(path, selector){
  /*
   * This fetches an html file representing a quiz at the dedicated path
   *
   * We expect that the the quiz follows the following format:
   * - We always assume that the first element is an h1 tag
   * - We always assume that the first section contains quiz info, and will not be modified
   * - The next few sections will all be quiz questions.
   * - They will all be mulitple choice with one answer (radio button) with the correct answer being at the top.
   * - We will shuffle at loadtime.
   *
   * We will then shuffle both the question order and inject the appropriate attributes to the HTML tags.
  */

  let quizMain = document.querySelector(selector);
  console.log(quizMain);
  let quizText = await fetch(path)
    .then(res => res.text());
  const parser = new DOMParser();
  let quizHtml = parser.parseFromString(quizText, 'text/html');
  // so DOMParser adds sematic tags wrapping like <head> <body> etc which is we need to work around
  let quizChildren = [...quizHtml.body.children];
  let quizHeading = quizChildren.shift();
  let quizInfo = quizChildren.shift();
  quizInfo.className = "quiz-card quiz-info";
  let quizQuestions = quizChildren;
  quizQuestions.forEach((questionSection, i) => {
    questionSection.className = "quiz-card quiz-question";
    let oldFieldset = questionSection.querySelector('fieldset');
    let newFieldSet = oldFieldset.cloneNode(true);
    let newFieldSetChildren = [...newFieldSet.children];
    let legend = newFieldSetChildren.shift();
    newFieldSetChildren.forEach((multipleChoiceOption, j) => {
      let input = multipleChoiceOption.querySelector("input");
      input.setAttribute("type", "radio");
      input.setAttribute("name", `q${i}`);
      if (j == 0){
        // by convention, the 0th element is correct
        input.setAttribute("value", "true");
      }
      else{
        input.setAttribute("value", "false");
      }
    })

    oldFieldset.replaceWith(newFieldSet);
  });
  shuffleArray(quizQuestions);
  //console.log(quizQuestions);
  let quizQuestionsAsText = quizQuestions.map(section => section.outerHTML).join("");
  quizMain.innerHTML = quizHeading.outerHTML + quizInfo.outerHTML + quizQuestionsAsText;

  /*
  injectContent(`/quizzes/${quizName}.html`, ".quiz-main");
  */

}

prepareQuiz(`/quizzes/${getQuizName()}.html`, ".quiz-main");
