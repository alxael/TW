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

// scroll down to section of section button click
const sections = ["about", "work", "contact"];
let sectionsHandleOnClick = {};
for (const section of sections) {
  sectionsHandleOnClick[section] = () => {
    const contactSection = document.getElementById(section);
    contactSection.scrollIntoView({ behavior: "smooth" });
  };
}

// open dropdown on menu button click
const menuHandleOnClick = () => {
  const dropdownContent = document.getElementById("navbar-dropdown-content");
  if (dropdownContent.style.display === "flex") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "flex";
  }
};

const windBackgroundPaths = document.getElementsByClassName("background-path");
for (let path of windBackgroundPaths) {
  path.style.animationDelay = Math.random() * 2.5 + 1 + "s";
  path.style.animationDuration = Math.random() * 3 + 3 + "s";
}

const onChangeEmail = () => {
  const email = document.getElementById("email");
  if (isEmailValid(email.value)) deleteInputError("email");
  else generateInputError("email", "Please enter a valid email.");
  isFormValid();
};

const isValueNotEmpty = (value) => value.length > 0;

const onChangeNotEmptyField = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  if (field) {
    if (isValueNotEmpty(field.value)) deleteInputError(fieldId);
    else generateInputError(fieldId, message);
  }
  isFormValid();
};

const isFormValid = () => {
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  const submitButton = document.getElementById("submit-button");
  if (
    isEmailValid(email) &&
    isValueNotEmpty(firstName) &&
    isValueNotEmpty(lastName)
  ) {
    submitButton.removeAttribute("disabled");
    submitButton.style.pointerEvents = "auto";
    submitButton.style.borderWidth = "0.1rem";
  } else {
    submitButton.setAttribute("disabled", "true");
    submitButton.style.pointerEvents = "none";
    submitButton.style.borderWidth = "0";
  }
};

const deleteResponseBox = () => {
  const responseBox = document.getElementById("response-box");
  if (responseBox) responseBox.remove();
};

const generateResponseBox = (isError, message) => {
  const main = document.getElementById("contact");
  deleteResponseBox();

  const responseBox = document.createElement("div");
  responseBox.setAttribute("id", "response-box");
  if (isError) responseBox.setAttribute("class", "error-box");
  else responseBox.setAttribute("class", "success-box");
  responseBox.innerHTML = message;
  main.appendChild(responseBox);
};

const submitForm = (event) => {
  event.preventDefault();

  let xhr = new XMLHttpRequest();
  let url = `${apiBasePath}/contact/createContact`;

  const contactReason = document.getElementById("contactReason");
  let data = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    company: document.getElementById("company").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    contactReason: contactReason.options[contactReason.selectedIndex].text,
    description: document.getElementById("description").value,
  };

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      generateResponseBox(
        false,
        "Contact request was succesfully sent. We'll reach back as soon as possible."
      );
    } else {
      generateResponseBox(
        true,
        "An error occured when sending the contact request. Please try again later."
      );
    }
    setTimeout(deleteResponseBox, 60000);
  };
  xhr.send(JSON.stringify(data));

  event.target.reset();
};
