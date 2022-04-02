const handleSubmit = () => {
  let titleField = document.getElementById("title"),
    paragraph1Field = document.getElementById("paragraph1"),
    paragraph2Field = document.getElementById("paragraph2"),
    paragraph3Field = document.getElementById("paragraph3"),
    image1Field = document.getElementById("image1"),
    image2Field = document.getElementById("image2"),
    errorParagraph = document.getElementById("error-paragraph"),
    errorsFound = false;
  if (titleField.value == "") {
    errorParagraph.innerHTML = "Title can't be empty.";
    errorsFound = true;
  } else if (titleField.value.length < 5) {
    errorParagraph.innerHTML = "The Title must be at least 5 characters long.";
  } else {
    if (paragraph1Field.value == "") {
      errorParagraph.innerHTML = "Paragraph 1 can't be empty.";
      errorsFound = true;
    } else {
      if (paragraph2Field.value == "") {
        errorParagraph.innerHTML = "Paragraph 2 can't be empty.";
        errorsFound = true;
      } else if (image1Field.value == "") {
        errorParagraph.innerHTML = "Image 1 is required.";
        errorsFound = true;
      } else if (
        paragraph1Field.value.length < 100 ||
        paragraph2Field.value.length < 100 ||
        (paragraph3Field.value != "" && paragraph1Field.value.length < 100)
      ) {
        errorParagraph.innerHTML =
          "Every written paragraph has to be at leat 100 characters long.";
      } else {
        const newBlogObj = {
          title: "Yves Isite",
          paragraph1: paragraph1Field.value,
          paragraph2: paragraph2Field.value,
          paragraph3Field: paragraph3Field.value,
          image1: image1Field.value,
          image2: image2Field.value,
          dateRegistered: Date.now(),
        };
        console.log(newBlogObj);
        localStorage.setItem("newBlogInfo", JSON.stringify(newBlogObj));
        document.location.href = "/ui/admin-dashboard.html";
      }
    }
  }
  if (errorsFound) {
    errorParagraph.style.display = "inline";
    titleField.classList.toggle("move-upper");
  }
};
