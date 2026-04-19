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

  let quizText = await fetch(path)
    .then(res => res.text());

  const parser = new DOMParser();
  let quizHtml = parser.parseFromString(quizText, 'text/html');
  // so DOMParser adds sematic tags wrapping like <head> <body> etc which is we need to work around
  let quizChildren = [...quizHtml.body.children];
  let quizHeading = quizChildren.shift();
  document.querySelector('title').textContent = quizHeading.textContent;
  let quizInfo = quizChildren.shift();
  quizInfo.className = "quiz-card quiz-info";
  quizInfo.innerHTML += `<p id="loading-progress"></p>`
  let quizQuestions = quizChildren;
  
  quizQuestions.forEach((questionSection, i) => {
    questionSection.className = "quiz-card quiz-question";

    // modification of the fieldset (shuffling and more)
    let oldFieldset = questionSection.querySelector('fieldset');
    let newFieldSet = oldFieldset.cloneNode(true);
    let newFieldSetChildren = [...newFieldSet.children];
    let legend = newFieldSetChildren.shift();

    newFieldSetChildren.forEach((multipleChoiceOption, j) => {
      let input = multipleChoiceOption.querySelector("input");
      input.setAttribute("type", "radio");
      input.setAttribute("name", `q${i + 1}`);
      if (j == 0){
        // by convention, the 0th element is correct
        input.setAttribute("value", "true");
      }
      else{
        input.setAttribute("value", "false");
      }
    })
    shuffleArray(newFieldSetChildren);
    oldFieldset.innerHTML = legend.outerHTML + newFieldSetChildren.map(el => el.outerHTML).join('');

    // add feedback div and button
    let feedbackDiv = `<div class="feedback" id='fb${i + 1}'></div>`;
    let submitButton = `<button class="question-submit" onclick="checkAnswer('q${i + 1}', 'fb${i + 1}')">Submit</button>`;
    questionSection.innerHTML += feedbackDiv + submitButton;
  });

  shuffleArray(quizQuestions);
  //console.log(quizQuestions);
  let quizQuestionsAsText = quizQuestions.map((section, i) => {
    const progressText = `<p class="progress">Question ${i+1} of ${quizQuestions.length}</p>`;
    section.innerHTML = progressText + section.innerHTML;
    return section.outerHTML;
  })
  .join("");

  quizMain.innerHTML = quizHeading.outerHTML + quizInfo.outerHTML + quizQuestionsAsText;
}


function hideImagesUntilLoaded(){
  const images = document.querySelectorAll("img");
  let loadedImageNum = [...images].filter(img => img.complete).length;
  if (loadedImageNum === images.length) {
    images.forEach(loadedImage => {
      loadedImage.style.visibility = 'visible';
    })
  }
  else{
    document.getElementById("loading-progress").textContent = "All images will show up all at once, once they're all loaded..."
    images.forEach(img => {
      img.style.visibility = 'hidden';
      img.onload = () => {
        loadedImageNum++;
        document.getElementById("loading-progress").textContent = `${loadedImageNum}/${images.length} images loaded`;
        if (loadedImageNum === images.length) {
          document.getElementById("loading-progress").textContent = '';
          images.forEach(loadedImage => {
            loadedImage.style.visibility = 'visible';
          })
        }
      }
    })
  }
}

prepareQuiz(`/quizzes/${getQuizName()}.html`, ".quiz-main").then(() =>{
  if (document.querySelector("img") != null){
    hideImagesUntilLoaded();
  }
})
