(function init() {
  hideValidationDivs();
  initEventListeners();
})();

function hideValidationDivs() {
  /* */
  const allErrorDivs = document.querySelectorAll(".error");
  const allSuccessDivs = document.querySelectorAll(".success");
  const validationDivs = [...allErrorDivs, ...allSuccessDivs];

  validationDivs.forEach((div) => {
    div.classList.add("display-none");
  });
}

function initEventListeners() {
  /* */
  const allInputs = document.querySelectorAll("input");
  const allShowPasswordButtons = document.querySelectorAll(".show-hide");
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
  });

  allShowPasswordButtons.forEach((button) => {
    button.addEventListener("click", showHidePassword);
  });

  document.addEventListener("keyup", (event) => {
    /* */
    if (event.altKey && event.key === "s") {
      console.log("alt + s");
      showHidePassword(event);
    }
  });

  allInputs.forEach((input) => {
    /* */
    input.addEventListener("keyup", (event) => {
      const errorDiv = input.parentElement.querySelector(".error");
      const successDiv = input.parentElement.querySelector(".success");

      validateField(event, errorDiv, successDiv);
      checkInputs(allInputs);
    });
  });
}

function checkInputs(allInputs) {
  /* */
  const submitButton = document.querySelector("button[type='submit']");
  const allSuccessDivs = document.querySelectorAll(".success:not(.display-none)");

  console.log(allSuccessDivs.length, allInputs.length);

  if (allSuccessDivs.length === allInputs.length) {
    submitButton.disabled = false;
  }

  if (allSuccessDivs.length !== allInputs.length) {
    submitButton.disabled = true;
  }
}

function showHidePassword(event) {
  /* */
  const parentElement = event.target.parentElement;
  const isVisible = parentElement.classList.contains("show");
  const input = parentElement.querySelector("input");

  if (isVisible) {
    parentElement.classList.remove("show");
    input.type = "password";
  }

  if (!isVisible) {
    parentElement.classList.add("show");
    input.type = "text";
  }
}

function validateField(event, errorDiv, successDiv) {
  /* */
  const { id, value } = event.target;

  if (id === "email") {
    emailTest(value, errorDiv, successDiv);
  }

  if (id === "name") {
    defaultTest(value.length, errorDiv, successDiv);
  }

  if (id === "password") {
    passwordTest(value, errorDiv, successDiv);
  }

  if (id === "confirm-password") {
    testPasswordsMatch(errorDiv, successDiv);
  }
}

function emailTest(email, errorDiv, successDiv) {
  /* */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  if (emailRegex.test(email)) {
    successDiv.classList.remove("display-none");
    errorDiv.classList.add("display-none");
  }

  if (!emailRegex.test(email)) {
    successDiv.classList.add("display-none");
    errorDiv.classList.remove("display-none");
  }
}

function defaultTest(length, errorDiv, successDiv) {
  /* */
  if (length >= 2) {
    successDiv.classList.remove("display-none");
    errorDiv.classList.add("display-none");
  }

  if (length < 2) {
    successDiv.classList.add("display-none");
    errorDiv.classList.remove("display-none");
  }
}

function passwordTest(password, errorDiv, successDiv) {
  /* */
  if (password.length >= 8) {
    successDiv.classList.remove("display-none");
    errorDiv.classList.add("display-none");
  }

  if (password.length < 8) {
    successDiv.classList.add("display-none");
    errorDiv.classList.remove("display-none");
  }
}

function testPasswordsMatch(errorDiv, successDiv) {
  /* */
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (password === confirmPassword) {
    successDiv.classList.remove("display-none");
    errorDiv.classList.add("display-none");
  }

  if (password !== confirmPassword) {
    successDiv.classList.add("display-none");
    errorDiv.classList.remove("display-none");
  }
}
