// @ts-nocheck
async function getUserInfoFromLocalStorage() {
  if (localStorage.getItem("iyPortfolioInfo")) {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res = await fetch(
      `https://my-brandbackend.herokuapp.com/api/users/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      const { _doc } = await res.json();
      if (_doc && _doc.role === "Admin")
        document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
      if (_doc && _doc.role !== "Admin") document.location.href = "/MY-BRAND";
    }
  }
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
    } else if (passwordField.value.length < 6) {
      errorParagraph.innerHTML = "Invalid password.";
      errorsFound = true;
    } else {
      try {
        const userObj = {
          email: emailField.value,
          password: passwordField.value,
        };
        const res = await fetch(
          "https://my-brandbackend.herokuapp.com/api/users/login",
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
            const { data, token } = await res.json();
            const storageInfo = {
              _id: data._doc._id,
              token,
            };
            localStorage.setItem(
              "iyPortfolioInfo",
              JSON.stringify(storageInfo)
            );
            if (data._doc.role === "Admin")
              document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
            else document.location.href = "/MY-BRAND";
          }
        }
      } catch (err) {
        console.error(err);
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
