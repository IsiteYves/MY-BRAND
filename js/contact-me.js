const handleSubmit = async () => {
  let emailField = document.getElementById("email"),
    namesField = document.getElementById("names"),
    messageField = document.getElementById("message"),
    errorParagraph = document.getElementById("error-paragraph"),
    successSpan = document.getElementById("success-span"),
    errorsFound = false,
    success = false;
  emailField.value = emailField.value.trim();
  namesField.value = namesField.value.trim();
  messageField.value = messageField.value.trim();
  if (emailField.value == "") {
    errorParagraph.innerHTML = "Email can not be empty.";
    errorsFound = true;
  } else {
    if (namesField.value == "") {
      errorParagraph.innerHTML = "Names can't be empty.";
      errorsFound = false;
    } else {
      if (namesField.value.length < 3) {
        errorParagraph.innerHTML = "Names must be at least 3 characters long.";
        errorsFound = true;
      } else {
        if (messageField.value == "") {
          errorParagraph.innerHTML = "Message can't be empty.";
          errorsFound = true;
        } else {
          if (messageField.value.length < 5) {
            errorParagraph.innerHTML =
              "Message has to be at least 5 characters long.";
            errorsFound = true;
          } else if (messageField.value.split(" ").length > 300) {
            errorParagraph.innerHTML = "Message must not exceed 300 words.";
            errorsFound = true;
          } else {
            success = true;
            const messageObj = {
              email: emailField.value,
              names: namesField.value,
              messageText: messageField.value,
            };
            const { _id, token } = JSON.parse(
              localStorage.getItem("iyPortfolioInfo")
            );
            const res = await fetch(
              // "https://my-brandbackend.herokuapp.com/api/query",
              "http://localhost:8000/api/query",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  Authorization: token,
                },
                body: JSON.stringify(messageObj),
              }
            );
          }
        }
      }
    }
  }
  if (errorsFound) {
    errorParagraph.style.display = "inline";
  }
  if (success) {
    errorParagraph.style.display = "none";
    successSpan.style.display = "inline";
  }
};

window.onload = async () => {
  if (!localStorage.getItem("iyPortfolioInfo")) {
    // document.location.href = "/ui/login.html";
    document.location.href = "/MY-BRAND/ui/login.html";
  } else {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res = await fetch(
      `https://my-brandbackend.herokuapp.com/api/user/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status !== 200) document.location.href = "/ui/login.html";
    else {
      const result = await res.json();
      if (result.role === "Admin") {
        document.location.href = "/ui/login.html";
      }
    }
  }
};
