window.onscroll = () => {
  if (window.scrollY < window.innerHeight / 4)
    document.getElementById("navbar").style.opacity = 0;
  else document.getElementById("navbar").style.opacity = 1;
};

window.onload = () => {
  const sections = ["about", "work", "contact"];
  for (const section of sections) {
    document
      .getElementById(`${section}-button`)
      .addEventListener("click", () => {
        const contactSection = document.getElementById(section);
        contactSection.scrollIntoView({ behavior: "smooth" });
      });
  }
};
