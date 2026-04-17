

// need to dynamically load footer
const footer = document.querySelector('footer');
console.log(footer);

async function loadData() {
  const response = fetch('/footer.html');
  const finalResponse = await response;
  const footerText = await finalResponse.text();
  footer.innerHTML = footerText;
}

loadData();
