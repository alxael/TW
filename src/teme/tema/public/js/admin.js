const logoutHandleOnClick = () => {
  let xhr = new XMLHttpRequest();
  let url = `${apiBasePath}/auth/logout`;

  console.log(url);

  xhr.open("POST", url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      window.location.href = "/auth/login";
    }
  };
  xhr.send();
};

const createContactData = (contactData) => {
  const main = document.getElementsByTagName("main")[0];

  const processedData = Array.from(contactData, (data, index) => {
    return {
      index: index + 1,
      email: data.email,
      name: data.firstName + data.lastName,
      company: data.company ? data.company : undefined,
      phoneNumber: data.phoneNumber ? data.phoneNumber : undefined,
      contactReason: data.contactReason ? data.loadContactData : undefined,
      description: data.description ? data.description : undefined,
    };
  });

  const createField = (message, fieldElement) => {
    const optionalField = document.createElement(fieldElement);
    optionalField.innerHTML = message;
    return optionalField;
  };

  for (const data of processedData) {
    const dataElement = document.createElement("div");
    dataElement.setAttribute("class", "data");

    const title = createField(`Contact #${data.index} - ${data.name}`, "h3");
    dataElement.appendChild(title);

    if (data.company) {
      const company = createField(`Company: ${data.company}`, "h5");
      dataElement.appendChild(company);
    }
    if (data.phoneNumber) {
      const phoneNumber = createField(
        `Phone number: ${data.phoneNumber}`,
        "h5"
      );
      dataElement.appendChild(phoneNumber);
    }
    if (data.contactReason) {
      const contactReason = createField(
        `Contact reason: ${data.contactReason}`,
        "h5"
      );
      dataElement.appendChild(contactReason);
    }
    if (data.description) {
      const description = createField(data.description, "p");
      dataElement.appendChild(description);
    }

    main.append(dataElement);
  }
};

const loadContactData = () => {
  let xhr = new XMLHttpRequest();
  let url = `${apiBasePath}/contact/readAllContact`;

  xhr.open("GET", url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      createContactData(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
};

loadContactData();
