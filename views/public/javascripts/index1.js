const save = document.querySelector("#save");
const form = document.querySelector("#form");
const number = document.querySelector("#number");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const numberError = document.getElementById("numberError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

save.addEventListener("click", (e) => {
  e.preventDefault();
  isValid = true;

  const numberPattern = /^[1-9,0]{10}$/;
  const emailPattern = /^[A-Za-z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
 
      if (!numberPattern.test(number.value)) {
        number.classList.add('error');
        numberError.classList.add('show');
        numberError.classList.remove("hidden");
        console.log("it is wrong");
        isValid = false;
      } else {
        number.classList.remove('error');
        numberError.classList.remove('show');
      }

       if (!emailPattern.test(email.value)) {
         email.classList.add("error");
         emailError.classList.add("show");
         emailError.classList.remove("hidden");
         console.log("not matching");
         isValid = false;
       } else {
        console.log("match");
         email.classList.remove("error");
         emailError.classList.remove("show");
       }

       if (!passwordPattern.test(password.value)) {
         password.classList.add("error");
         passwordError.classList.add("show");
         passwordError.classList.remove("hidden");
         isValid = false;
       } else {
         password.classList.remove("error");
         passwordError.classList.remove("show");
       }

       if (isValid) {
         console.log("Form is valid. Submitting...");
         form.submit();
       }


  }
);
