// hide/show navbar depending on scroll position
window.onscroll = () => {
  const navbar = document.getElementById("navbar");
  const root = document.querySelector(":root");
  if (window.scrollY < window.innerHeight / 4) {
    navbar.style.opacity = 0;
    navbar.style.zIndex = 0; // send behind everything else
  } else {
    navbar.style.opacity = 1;
    navbar.style.zIndex =
      getComputedStyle(root).getPropertyValue("--navbar-layer"); // send in front of everything else
  }
};

// global theme variable
const setTheme = (currentIsThemeDark) => {
  console.log(currentIsThemeDark);
  localStorage.setItem("isThemeDark", currentIsThemeDark.toString());

  const root = document.querySelector(":root");
  const changeableVariables = [
    "--background-primary-color",
    "--background-secondary-color",
    "--font-primary-color",
  ];

  const suffix = currentIsThemeDark ? "dark" : "light";

  for (const variable of changeableVariables) {
    const value = getComputedStyle(root).getPropertyValue(
      `${variable}-${suffix}`
    );
    root.style.setProperty(variable, value);
  }
};

const localIsThemeDark = localStorage.getItem("isThemeDark");
console.log(localIsThemeDark);
let isThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localIsThemeDark !== null) {
  isThemeDark = localIsThemeDark === "true";
}
setTheme(isThemeDark);
