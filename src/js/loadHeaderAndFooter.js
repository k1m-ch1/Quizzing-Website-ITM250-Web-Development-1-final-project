// need to dynamically load footer

const toggleSwitchContent = {
  dark : "Switch To Light Mode",
  light : "Switch To Dark Mode"
};

const pathPrefix = window.location.pathname.startsWith('/src/') ? '/src' : '';

function setTheme(){
  document.querySelector("html").className = localStorage.getItem("theme");
}

injectContent(`${pathPrefix}/footer.html`, 'footer');
injectContent(`${pathPrefix}/nav.html`, 'nav').then(() => {
  // code to handle light mode and dark mode
  let theme = localStorage.getItem("theme");
  const preferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const themeToggleButton = document.getElementById("theme-toggle");
  if (preferDarkTheme){
    localStorage.setItem("theme", "dark");
    theme = "dark";
  }
  else{
    localStorage.setItem("theme", "light");
    theme = "light";
  }
  themeToggleButton.innerHTML += toggleSwitchContent[theme];
  setTheme();
  themeToggleButton.addEventListener("click", () => {
    if (localStorage.getItem("theme") === "dark"){
      localStorage.setItem("theme", "light");
      themeToggleButton.innerHTML = toggleSwitchContent["light"]
    }
    else{
      localStorage.setItem("theme", "dark");
      themeToggleButton.innerHTML = toggleSwitchContent["dark"];
    }
    setTheme();
  })
});
