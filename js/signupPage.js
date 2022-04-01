const handleSubmit = () => {
    let emailField = document.getElementById("email"),
      passwordField = document.getElementById("password"),
      errorParagraph = document.getElementById("error-paragraph"),
      errorsFound = false;
    if (emailField.value == "") {
      errorParagraph.innerHTML = "Email can not be empty.";
      errorsFound = true;
    } else {
      if (passwordField.value == "") {
        errorParagraph.innerHTML = "Password can not be empty.";
        errorsFound = true;
      } else {
        if (emailField.value != "yvesisite@gmail.com") {
          errorParagraph.innerHTML = "Email not registered.";
          errorsFound = true;
        } else if (
          passwordField.value != "pass123" ||
          passwordField.value.length < 6
        ) {
          errorParagraph.innerHTML = "Invalid password.";
          errorsFound = true;
        } else {
          const userObj = {
            username: "Yves Isite",
            email: "yvesisite@gmail.com",
            role: "Admin",
          };
          localStorage.setItem("userInfo", JSON.stringify(userObj));
          document.location.href = "/ui/admin-dashboard.html";
        }
      }
    }
    if (errorsFound) {
      errorParagraph.style.display = "inline";
      emailField.classList.toggle("move-upper");
    }
  };