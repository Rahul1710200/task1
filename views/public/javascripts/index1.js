const save = document.querySelector("#save");
const form = document.querySelector("#form");
const number = document.querySelector("#number");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#login");

const numberError = document.getElementById("numberError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

save.addEventListener("click", (e) => {
  e.preventDefault();
  let isValid = true;

  // Patterns
  const numberPattern = /^[1-9][0-9]{9}$/; // Mobile number should be exactly 10 digits.
  const emailPattern = /^[A-Za-z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const loginPattern = /^[a-zA-Z0-9]{8,}$/; // At least 8 alphanumeric characters

  // Validate Number
  if (!numberPattern.test(number.value)) {
    number.classList.add("error");
    numberError.classList.add("show");
    numberError.classList.remove("hidden");
    isValid = false;
  } else {
    number.classList.remove("error");
    numberError.classList.remove("show");
  }

  // Validate Email
  if (!emailPattern.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("show");
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("show");
  }

  // Validate Password
  if (!passwordPattern.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("show");
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("show");
  }

  // Validate Login
  if (!loginPattern.test(login.value)) {
    login.classList.add("error");
    loginError.classList.add("show");
    loginError.classList.remove("hidden");
    isValid = false;
  } else {
    login.classList.remove("error");
    loginError.classList.remove("show");
  }

  if (isValid) {
    console.log("Form is valid. Submitting...");
    form.submit();
  }
});
