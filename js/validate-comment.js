const handleSubmit = () => {
  let commentField = document.getElementById("blog-comment"),
    errorParagraph = document.getElementById("error-paragraph"),
    successSpan = document.getElementById("success-span"),
    errorsFound = false,
    success = false;
  if (commentField.value == "") {
    errorParagraph.innerHTML = "Comment can't be empty.";
    errorsFound = true;
  } else {
    if (commentField.value.length < 3) {
      errorParagraph.innerHTML =
        "The comment must be at least 3 characters long.";
      errorsFound = true;
    } else {
      success = true;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const commentObj = {
        username: userInfo.username,
        comment: commentField.value,
        timeCommented: Date.now(),
      };
      console.log(commentObj);
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
