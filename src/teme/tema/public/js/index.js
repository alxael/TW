// global theme variable
const setTheme = (currentIsThemeDark) => {
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
let isThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (localIsThemeDark !== null) {
  isThemeDark = localIsThemeDark === "true";
}
setTheme(isThemeDark);

// change theme on theme button click
const themeHandleOnClick = () => {
  isThemeDark = !isThemeDark;
  setTheme(isThemeDark);
};

// validation functions
const isEmailValid = (email) => {
  return (
    RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    ).exec(String(email).toLowerCase()) !== null
  );
};

// api base path
const apiBasePath = "http://localhost:8080";

// form error utilities
const deleteInputError = (inputId) => {
  const error = document.getElementById(`${inputId}-error-message`);
  if (error) error.remove();
};

const generateInputError = (inputId, message) => {
  deleteInputError(inputId);

  const input = document.getElementById(inputId).parentElement;

  if (input) {
    const error = document.createElement("div");
    error.setAttribute("id", `${inputId}-error-message`);
    error.style.color = "red";
    error.style.fontSize = "0.75rem";
    error.style.marginTop = "0.25rem";
    error.innerHTML = message;
    input.appendChild(error);
  }
};
