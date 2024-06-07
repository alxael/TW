const deleteErrorBox = () => {
  const errorBox = document.getElementById("error-box");
  if (errorBox) errorBox.remove();
};

const generateErrorBox = (message) => {
  const main = document.getElementsByTagName("main")[0];
  deleteErrorBox();

  const errorBox = document.createElement("div");
  errorBox.setAttribute("id", "error-box");
  errorBox.setAttribute("class", "error-box");
  errorBox.innerHTML = message;
  main.appendChild(errorBox);
};

const onChangeEmail = () => {
  const email = document.getElementById("email");
  if (isEmailValid(email.value)) deleteInputError("email");
  else generateInputError("email", "Please enter a valid email.");
  isFormValid();
};

const isPasswordValid = (password) => password.length > 0;

const onInputPassword = () => {
  const password = document.getElementById("password");
  if (isPasswordValid(password.value)) deleteInputError("password");
  else generateInputError("password", "Password must not be empty.");
  isFormValid();
};

const isFormValid = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const submitButton = document.getElementById("submit-button");
  if (isEmailValid(email) && isPasswordValid(password)) {
    submitButton.removeAttribute("disabled");
    submitButton.style.pointerEvents = "auto";
    submitButton.style.borderWidth = "0.1rem";
  } else {
    submitButton.setAttribute("disabled", "true");
    submitButton.style.pointerEvents = "none";
    submitButton.style.borderWidth = "0";
  }
};

const submitForm = (event) => {
  event.preventDefault();

  let xhr = new XMLHttpRequest();
  let url = `${apiBasePath}/auth/login`;
  let data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      window.location.href = "/admin/main";
    } else {
      generateErrorBox(xhr.responseText);
      setTimeout(deleteErrorBox, 10000);
    }
  };
  xhr.send(JSON.stringify(data));
};
