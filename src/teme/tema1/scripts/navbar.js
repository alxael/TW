// scroll down to section of section button click
const sections = ["about", "work", "contact"];
let sectionsHandleOnClick = {};
for (const section of sections) {
  sectionsHandleOnClick[section] = () => {
    const contactSection = document.getElementById(section);
    contactSection.scrollIntoView({ behavior: "smooth" });
  };
}

// change theme on theme button click
const themeHandleOnClick = () => {
  isThemeDark = !isThemeDark;
  setTheme(isThemeDark);
};

// open dropdown on menu button click
const menuHandleOnClick = () => {
  const dropdownContent = document.getElementById("navbar-dropdown-content");
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
};
