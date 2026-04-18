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
