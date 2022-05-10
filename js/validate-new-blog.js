// @ts-nocheck
// const formLoader = document.querySelector("#formLoader");
// formLoader.style.display = "none";
const handleSubmit = async () => {
  let titleField = document.getElementById("title"),
    paragraph1Field = document.getElementById("paragraph1"),
    paragraph2Field = document.getElementById("paragraph2"),
    paragraph3Field = document.getElementById("paragraph3"),
    image1Field = document.getElementById("image1"),
    image2Field = document.getElementById("image2"),
    errorParagraph = document.getElementById("error-paragraph"),
    errorsFound = false;
  titleField.value = titleField.value.trim();
  paragraph1Field.value = paragraph1Field.value.trim();
  paragraph2Field.value = paragraph2Field.value.trim();
  paragraph3Field.value = paragraph3Field.value.trim();
  if (titleField.value == "") {
    errorParagraph.innerHTML = "Title can't be empty.";
    errorsFound = true;
  } else if (titleField.value.length < 5) {
    errorParagraph.innerHTML = "The Title must be at least 5 characters long.";
    errorsFound = true;
  } else if (titleField.value.length > 60) {
    errorParagraph.innerHTML =
      "The Title must be at maximum 60 characters long.";
    errorsFound = true;
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
        paragraph1Field.value.length < 200 ||
        paragraph2Field.value.length < 200 ||
        (paragraph3Field.value != "" && paragraph3Field.value.length < 200)
      ) {
        errorParagraph.innerHTML =
          "Every written paragraph has to be at leat 200 characters long.";
        errorsFound = true;
      } else {
        let newBlogObj = {
          title: titleField.value,
          paragraph1: paragraph1Field.value,
          paragraph2: paragraph2Field.value,
          paragraph3: paragraph3Field.value,
          image1Url: "",
          image2Url: "",
          comments: [],
          likes: [],
          dislikes: [],
        };
        const formData1 = new FormData();
        const formData2 = new FormData();
        const uploaded1 = image1Field.files[0];
        const uploaded2 = image2Field.files[0];
        formData1.append("file", uploaded1);
        formData1.append("upload_preset", "bt7sz20d");
        formData2.append("file", uploaded2);
        formData2.append("upload_preset", "bt7sz20d");
        const uploadError = false;
        let image2Url = "";
        formLoader.style.display = "block";
        const res1 = await fetch(
          "https://api.cloudinary.com/v1_1/yvesisite/image/upload",
          {
            method: "POST",
            headers: {},
            body: formData1,
          }
        );
        if (res1.status !== 200) {
          uploadError = true;
        }
        newBlogObj.image1Url = (await res1.json()).url;
        if (image2Field.value !== "") {
          const res2 = await fetch(
            "https://api.cloudinary.com/v1_1/yvesisite/image/upload",
            {
              method: "POST",
              headers: {},
              body: formData2,
            }
          );
          if (res2.status !== 200) uploadError = true;
          else image2Url = (await res2.json()).url;
        }
        if (!uploadError) {
          newBlogObj.image2Url = image2Url;
          const { token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
          formLoader.style.display = "block";
          const res3 = await fetch(
            `https://my-brandbackend.herokuapp.com/api/blogs`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: token,
              },
              body: JSON.stringify(newBlogObj),
            }
          );
          formLoader.style.display = "none";
          if (res3.status !== 201) {
            errorsFound = true;
            errorParagraph.innerHTML = "Blog storage error";
          } else {
            alert("Successfully posted the new blog.");
            errorsFound = false;
            window.location.href = "/ui/admin-dashboard.html";
          }
        } else {
          formLoader.style.display = "none";
          errorsFound = true;
          errorParagraph.innerHTML = "Image upload error";
        }
      }
    }
  }
  if (errorsFound) {
    errorParagraph.style.display = "inline";
    titleField.classList.toggle("move-upper");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  } else {
    errorParagraph.style.display = "none";
    titleField.classList.toggle("hidden");
  }
};
