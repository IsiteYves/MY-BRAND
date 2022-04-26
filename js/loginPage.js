async function getUserInfoFromLocalStorage() {
  if (localStorage.getItem("iyPortfolioInfo")) {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res = await fetch(
      `https://my-brandbackend.herokuapp.com/api/user/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      const result = await res.json();
      if (result && result.role === "Admin")
        // document.location.href = "/ui/admin-dashboard.html";
        document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
      if (result && result.role !== "Admin")
        // document.location.href = "/ui/admin-dashboard.html";
        document.location.href = "/";
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
    } else {
      try {
        const userObj = {
          email: emailField.value,
          password: passwordField.value,
        };
        const res = await fetch(
          "https://my-brandbackend.herokuapp.com/api/user/login",
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
              _id: data._id,
              token,
            };
            localStorage.setItem(
              "iyPortfolioInfo",
              JSON.stringify(storageInfo)
            );
            if (data.role === "Admin")
              document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
            else document.location.href = "/";
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
