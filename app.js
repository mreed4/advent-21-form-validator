const allFields = document.querySelectorAll(".field");
const form = document.querySelector("form");

(function init() {
  hideValidationDivs();
  disableFormSubmit();
})();

function disableFormSubmit() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

function hideValidationDivs() {
  [...allFields]
    .filter((field) => field.childElementCount > 1)
    .forEach((field) => {
      const validationDivs = [...field.children].filter((child) => child.localName === "div");
      const [errorDiv, successDiv] = validationDivs;

      validationDivs.forEach((div) => {
        div.classList.add("display-none");
      });

      field.addEventListener("input", (event) => {
        handleInputBlur(event, errorDiv, successDiv, event.target);
      });
    });
}

function handleInputBlur(event, errorDiv, successDiv, input) {
  /* */
  if (event.target.id === "email") {
    const email = input.value;
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

  if (event.target.id !== "email") {
    if (event.target.value.length >= 2) {
      successDiv.classList.remove("display-none");
      errorDiv.classList.add("display-none");
    }

    if (event.target.value.length < 2) {
      successDiv.classList.add("display-none");
      errorDiv.classList.remove("display-none");
    }
  }

  if (event.target.id === "confirm-password") {
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
}
