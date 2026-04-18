const path = window.location.pathname;
const splitted = path.split('/');
quizName = splitted[splitted.length - 2];
// we're assuming that we're storing quizzes as /quiz-pages/quiz-name/
// quizName also has dashes to replace spaces
console.log(quizName);
injectContent(`/quizzes/${quizName}.html`, ".quiz-main");
