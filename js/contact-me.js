const handleSubmit = () => {
  let emailField = document.getElementById("email"),
    namesField = document.getElementById("names"),
    messageField = document.getElementById("message"),
    errorParagraph = document.getElementById("error-paragraph"),
    successSpan = document.getElementById("success-span"),
    errorsFound = false,
    success = false;
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
          if (messageField.value.length < 3) {
            errorParagraph.innerHTML =
              "Message has to be at least 3 characters long.";
            errorsFound = true;
          } else {
            success = true;
            const messageObj = {
              senderEmail: emailField.value,
              senderNames: namesField.value,
              messageText: messageField.value,
            };
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
