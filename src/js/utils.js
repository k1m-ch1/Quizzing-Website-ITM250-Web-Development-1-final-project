async function loadTag(tagAsString) {
  // loading the footer
  const tag = document.querySelector(tagAsString);
  await fetch(`/${tagAsString}.html`)
    .then(response => response.text())
    .then(text => tag.innerHTML = text);
}

async function injectContent(path, selector){
  // injects plain text from a url into the selector
  const tag = document.querySelector(selector);
  await fetch(path)
    .then(response => response.text())
    .then(text => tag.innerHTML = text);
}

function shuffleArray(arr){
  // implements Fisher-Yates shuffle on an array
  // NOTE: this mutates the array
  for (let i = arr.length - 1; i > 0; i--){
    // go from arr.length - 1 -> 1 (inclusive)
    const j = Math.floor(Math.random()*(i + 1));
    let aux = arr[i]; 
    arr[i] = arr[j];
    arr[j] = aux;
  }
}
