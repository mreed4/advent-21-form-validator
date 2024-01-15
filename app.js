const allFields = document.querySelectorAll(".field");
const allShowPasswordButtons = document.querySelectorAll(".show-hide");
const form = document.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");

(function init() {
  hideValidationDivs();
  initEventListeners();
})();

function initEventListeners() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
  });

  allShowPasswordButtons.forEach((button) => {
    button.addEventListener("click", showHidePassword);
  });

  document.addEventListener("keyup", (event) => {
    if (event.altKey && event.key === "s") {
      console.log("alt + s");
      showHidePassword(event);
    }
  });
}

function toggleSubmitButton() {
  /* */
  const isDisabled = submitButton.hasAttribute("disabled");

  if (isDisabled) {
    submitButton.removeAttribute("disabled");
  }

  if (!isDisabled) {
    submitButton.setAttribute("disabled", "disabled");
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

function hideValidationDivs() {
  /* */
  [...allFields]
    .filter((field) => field.childElementCount > 1) // filter out fields with only one child
    .forEach((field) => {
      const validationDivs = [...field.children].filter((child) => child.localName === "div");
      const [errorDiv, successDiv] = validationDivs;

      validationDivs.forEach((div) => {
        div.classList.add("display-none");
      });

      field.addEventListener("input", (event) => {
        validateField(event, errorDiv, successDiv);
      });
    });
}

function validateField(event, errorDiv, successDiv) {
  /* */
  const { id, value } = event.target;

  if (id === "email") {
    emailTest(value, errorDiv, successDiv);
  }

  if (id !== "email") {
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
