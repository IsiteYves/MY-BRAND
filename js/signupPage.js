// @ts-nocheck
const handleSubmit = async () => {
  let namesField = document.getElementById("names"),
    emailField = document.getElementById("email"),
    addressField = document.getElementById("address"),
    passwordField = document.getElementById("password"),
    repeatPasswordField = document.getElementById("repeatedPassword"),
    errorParagraph = document.getElementById("error-paragraph"),
    successSpan = document.getElementById("success-span"),
    errorsFound = false,
    success = false;
  if (namesField.value == "") {
    errorParagraph.innerHTML = "Names field can not be empty.";
    errorsFound = true;
  } else {
    if (emailField.value == "") {
      errorParagraph.innerHTML = "Email can not be empty";
      errorsFound = true;
    } else {
      if (passwordField.value == "") {
        errorParagraph.innerHTML = "Password can not be empty.";
        errorsFound = true;
      } else {
        if (repeatPasswordField.value == "") {
          errorParagraph.innerHTML = "Please confirm password";
          errorsFound = true;
        } else {
          if (namesField.value.length < 3) {
            errorParagraph.innerHTML =
              "Names must be at least 3 characters long.";
            errorsFound = true;
          } else if (namesField.value.length > 75) {
            errorParagraph.innerHTML =
              "Names must not be beyond 75 characters.";
            errorsFound = true;
          } else {
            if (passwordField.value.length < 6) {
              errorParagraph.innerHTML =
                "The password must be at least 6 characters long";
              errorsFound = true;
            } else if (passwordField.value.length > 25) {
              errorParagraph.innerHTML =
                "The password must not be beyond 25 characters";
              errorsFound = true;
            } else if (passwordField.value != repeatPasswordField.value) {
              errorParagraph.innerHTML =
                "Please confirm your password correctly.";
              errorsFound = true;
            } else {
              if (addressField.value.length < 10) {
                errorParagraph.innerHTML =
                  "Residence must be at least 10 characters long.";
                errorsFound = true;
              } else {
                if (addressField.value.length > 150) {
                  errorParagraph.innerHTML =
                    "Residence must not exceed 150 characters.";
                  errorsFound = true;
                } else {
                  const userObj = {
                    names: namesField.value,
                    email: emailField.value,
                    password: passwordField.value,
                    address: addressField.value,
                  };
                  const res = await fetch(
                    "https://my-brandbackend.herokuapp.com/api/users",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json;charset=utf-8",
                      },
                      body: JSON.stringify(userObj),
                    }
                  );
                  if (res.status === 201) {
                    success = true;
                  } else {
                    if (res.status === 400) {
                      errorParagraph.innerHTML = "Email already taken.";
                      errorsFound = true;
                    } else {
                      errorParagraph.innerHTML = "Server error.";
                      errorsFound = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (errorsFound || success) {
    emailField.classList.toggle("move-upper");
  }
  if (errorsFound) {
    errorParagraph.style.display = "inline";
  }
  if (success) {
    errorParagraph.style.display = "none";
    successSpan.style.display = "inline";
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
