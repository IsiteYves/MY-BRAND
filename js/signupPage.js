const handleSubmit = () => {
  let namesField = document.getElementById("names"),
    emailField = document.getElementById("email"),
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
          } else {
            if (passwordField.value.length < 6) {
              errorParagraph.innerHTML =
                "The password must be at least 6 characters long";
              errorsFound = true;
            } else if (passwordField.value != repeatPasswordField.value) {
              errorParagraph.innerHTML =
                "Please confirm your password correctly.";
              errorsFound = true;
            } else {
              success = true;
              const userObj = {
                  username: namesField.value,
                  email: emailField.value,
                  password: passwordField.value,
                  role: "Standard",
                },
                existingUsersStr = localStorage.getItem("registeredUsers"),
                registeredUsers = JSON.parse(existingUsersStr);
              registeredUsers.push(userObj);
              localStorage.setItem(
                "registeredUsers",
                JSON.stringify(registeredUsers)
              );
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
};
