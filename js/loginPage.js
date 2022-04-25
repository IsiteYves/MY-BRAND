function getUserInfoFromLocalStorage() {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
}
const handleSubmit = async () => {
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
        const res = await fetch(
          "https://my-brandbackend.herokuapp.com/api/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userObj),
          }
        );
        if (res.status === 404) {
          errorParagraph.innerHTML = "Incorrect email or password";
          errorsFound = true;
        } else {
          if (res.status === 500) {
            errorParagraph.innerHTML = "Server error.";
            errorsFound = true;
          } else {
            const hd = res.headers;
            console.log(hd);
            document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
          }
        }
      }
    }
  }
  if (errorsFound) {
    errorParagraph.style.display = "inline";
    emailField.classList.toggle("move-upper");
  }
};
window.onload = () => {
  getUserInfoFromLocalStorage();
};
