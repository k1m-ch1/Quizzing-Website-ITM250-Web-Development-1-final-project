async function loadTag(tagAsString) {
  // loading the footer
  const tag = document.querySelector(tagAsString);
  await fetch(`${tagAsString}.html`)
    .then(response => response.text())
    .then(text => tag.innerHTML = text);
}
