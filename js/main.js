// @ts-nocheck
const adminBlogs = document.getElementById("adminBlogs"),
  standardBlogs = document.querySelector("#standardBlogs"),
  blogUpdateForm = document.querySelector("#blogUpdateForm"),
  formLoader = document.querySelector("#formLoader"),
  titleField = document.getElementById("title"),
  blogLoader = document.querySelector("#blogLoader"),
  paragraph1Field = document.getElementById("paragraph1"),
  paragraph2Field = document.getElementById("paragraph2"),
  paragraph3Field = document.getElementById("paragraph3"),
  singleBlog = document.querySelector("#single-blog"),
  singleBlogHeader = document.querySelector("#blogHeader");
let userNames = "",
  userEmail = "",
  userProfilePicUrl = "";
if (formLoader) formLoader.style.display = "none";
let blogToUpdate = "",
  blogToUpdateInfo = {};
if (document.getElementsByClassName("menu-block-link")[0]) {
  const menuBlockLink = document.getElementsByClassName("menu-block-link")[0];
  menuBlockLink.onclick = (e) => {
    const isCloseClicked = e.target.id == "menubarRemoveIcon";
    if (isCloseClicked) return;
    if (!isCloseClicked) {
      document.location.href = "/MY-BRAND/";
    }
  };
}
if (document.querySelector("#menuIcon")) {
  const menuIcon = document.querySelector("#menuIcon");
  menuIcon.addEventListener("click", () => {
    document.getElementsByClassName("Menubar")[0].style.display = "block";
  });
}
if (document.getElementById("menubarRemoveIcon")) {
  menubarRemoveIcon = document.getElementById("menubarRemoveIcon");
  menubarRemoveIcon.onclick = () => {
    document.getElementsByClassName("Menubar")[0].style.display = "none";
  };
}
async function getUserInfoFromLocalStorage() {
  if (
    document.getElementById("username") &&
    document.getElementById("email") &&
    document.getElementById("user-role")
  ) {
    let usernameEl = document.getElementById("username"),
      emailEl = document.getElementById("email"),
      userRoleEl = document.getElementById("user-role");
    if (!localStorage.getItem("iyPortfolioInfo")) {
      document.location.href = "/MY-BRAND/ui/login.html";
    } else {
      const { _id, token } = JSON.parse(
        localStorage.getItem("iyPortfolioInfo")
      );
      const res = await fetch(
        `https://my-brandbackend.herokuapp.com/api/users/${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status !== 200)
        document.location.href = "/MY-BRAND/ui/login.html";
      else {
        const { _doc } = await res.json();
        const { names, email, role } = _doc;
        if (role !== "Admin")
          document.location.href = "/MY-BRAND/ui/login.html";
        usernameEl.innerHTML = names;
        emailEl.innerHTML = email;
        userRoleEl.innerHTML = role;
      }
    }
  }
  const signedInUsernames = document.getElementById("signedInUsernames"),
    commentForm = document.getElementById("comment-form");
  if (signedInUsernames || commentForm) {
    if (localStorage.getItem("iyPortfolioInfo")) {
      const { _id, token } = JSON.parse(
        localStorage.getItem("iyPortfolioInfo")
      );
      const res = await fetch(
        `https://my-brandbackend.herokuapp.com/api/users/${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        const result = await res.json(),
          loginBtn = document.getElementById("loginBtn");
        if (loginBtn) loginBtn.style.display = "none";
        const { names, email, profilePicUrl, role } = result._doc;
        userNames = names;
        userEmail = email;
        userProfilePicUrl = profilePicUrl;
        if (signedInUsernames) signedInUsernames.innerHTML = names;
        if (role !== "Admin") {
          if (signedInUsernames)
            document.getElementById("signedInRole").innerHTML = "Standard User";
        } else {
          if (signedInUsernames)
            if (role === "Admin")
              document.location.href = "/MY-BRAND/ui/admin-dashboard.html";
        }
      } else {
        if (signedInUsernames) execShow();
        if (commentForm) commentForm.style.display = "none";
      }
    } else {
      if (commentForm) commentForm.style.display = "none";
      if (signedInUsernames) {
        execShow();
      }
    }
  }
}

function execShow() {
  document.getElementById("logout").style.display = "none";
  document.getElementById("profileLi").style.display = "none";
}

const exploreMore = document.getElementById("exploreMore");
if (exploreMore) {
  exploreMore.onclick = () => {
    document.location.href = "/MY-BRAND/ui/about-me.html";
  };
}

function changePage(to) {
  document.location.href = `/MY-BRAND/ui/${to}`;
}
function logout() {
  localStorage.removeItem("iyPortfolioInfo");
}
async function deleteBlog(id) {
  const delConfirm = confirm("Are you sure you want to delete this blog?");
  if (delConfirm) {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res = await fetch(
      `https://my-brandbackend.herokuapp.com/api/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      alert("Successfully deleted the blog.");
      window.location.reload();
    } else alert("Error while deleting the blog.");
  }
}
async function loadBlogs1() {
  const loadingBlogs = document.getElementById("loadingBlogs");
  const blogsNbr = document.querySelector("#blogsNbr");
  blogsNbr.style.display = "none";
  const res = await fetch(`https://my-brandbackend.herokuapp.com/api/blogs`),
    result = await res.json();
  loadingBlogs.style.display = "none";
  blogsNbr.style.display = "block";
  if (result.length === 0) {
    blogsNbr.innerHTML = "No blogs created yet.";
    return;
  }
  if (result.length === 1) blogsNbr.innerHTML = "1 blog found.";
  else blogsNbr.innerHTML = `${result.length} blogs found.`;
  for (let i = 0; i < result.length; i++) {
    const dt = new Date(result[i].dateAdded);
    const wkDays = [
        "Sundary",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    let day = wkDays[dt.getDay()],
      month = months[dt.getMonth()],
      year = dt.getFullYear(),
      hour = dt.getHours(),
      minutes = dt.getMinutes();
    let time,
      date = dt.getDate();
    if (date < 10) date = `0${date}`;
    if (hour < 12) time = `0${hour}:${minutes} AM`;
    else time = `${hour}:${minutes} PM`;
    const newEl = document.createElement("div"),
      d1 = document.createElement("div"),
      a1 = document.createElement("a"),
      txt1 = document.createTextNode("Edit"),
      h3 = document.createElement("h3"),
      txt2 = document.createTextNode(`${result[i].title}`),
      p1 = document.createElement("p"),
      txt3 = document.createTextNode(
        `${result[i].paragraph1.substr(0, 140)}...`
      ),
      a2 = document.createElement("a"),
      txt4 = document.createTextNode("View"),
      btn = document.createElement("button"),
      txt5 = document.createTextNode("Delete"),
      p2 = document.createElement("p"),
      sp = document.createElement("span"),
      txt6 = document.createTextNode("Date posted: "),
      txt7 = document.createTextNode(
        `${day} | ${month} ${date},${year} | ${time}`
      );
    newEl.setAttribute("class", "blog");
    a1.setAttribute("href", `./update-blog.html?q=${result[i]._id}`);
    a1.setAttribute("title", "Edit this blog");
    a1.append(txt1);
    d1.style.backgroundImage = `url(${result[i].image1Url})`;
    if (adminBlogs) d1.appendChild(a1);
    h3.appendChild(txt2);
    p1.append(txt3);
    a2.setAttribute("href", `./single-blog-view.html?q=${result[i]._id}`);
    a2.append(txt4);
    btn.append(txt5);
    p2.setAttribute("id", "datePosted");
    sp.append(txt6);
    p2.appendChild(sp);
    p2.append(txt7);
    newEl.appendChild(d1);
    newEl.appendChild(h3);
    newEl.appendChild(p1);
    newEl.appendChild(a2);
    if (adminBlogs) newEl.appendChild(btn);
    newEl.appendChild(p2);
    if (adminBlogs) adminBlogs.appendChild(newEl);
    if (standardBlogs) standardBlogs.appendChild(newEl);
    btn.onclick = () => {
      deleteBlog(result[i]._id);
    };
  }
}
async function checkAdmin() {
  if (!localStorage.getItem("iyPortfolioInfo")) {
    document.location.href = "/MY-BRAND/ui/login.html";
  } else {
    const { _id, token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
    const res = await fetch(
      `https://my-brandbackend.herokuapp.com/api/users/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status !== 200) document.location.href = "/MY-BRAND/ui/login.html";
  }
}
const handleUpdate = async () => {
  let image1Field = document.getElementById("image1"),
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
      } else if (
        paragraph1Field.value.length < 200 ||
        paragraph2Field.value.length < 200 ||
        (paragraph3Field.value != "" && paragraph3Field.value.length < 200)
      ) {
        errorParagraph.innerHTML =
          "Every written paragraph has to be at leat 200 characters long.";
        errorsFound = true;
      } else {
        const { comments, likes, dislikes, image1Url, image2Url } =
          blogToUpdateInfo;
        let newBlogObj = {
          title: titleField.value,
          paragraph1: paragraph1Field.value,
          paragraph2: paragraph2Field.value,
          paragraph3: paragraph3Field.value,
          image1Url,
          image2Url,
          likes,
          dislikes,
          comments: [...comments],
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
        let image2Url1 = "";
        formLoader.style.display = "block";
        if (image1Field.value !== "") {
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
        }
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
          else image2Url1 = (await res2.json()).url;
        }
        if (!uploadError) {
          if (image2Field.value !== "") newBlogObj.image2Url = image2Url1;
          const { token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
          formLoader.style.display = "block";
          const res3 = performUpdate(newBlogObj, blogToUpdate, token);
          formLoader.style.display = "none";
          if (res3.status !== 200) {
            errorsFound = true;
            errorParagraph.innerHTML = "Blog update error";
          } else {
            alert("Successfully updated the blog.");
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

window.onload = async () => {
  await getUserInfoFromLocalStorage();
  if (adminBlogs || standardBlogs) loadBlogs1();
  if (standardBlogs && document.documentElement.clientWidth > 637)
    document.documentElement.style.overflow = "hidden";
  if (document.getElementById("newblogform")) checkAdmin();
  if (blogUpdateForm || singleBlog) {
    if (blogUpdateForm) checkAdmin();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    blogToUpdate = urlParams.get("q");
    if (blogToUpdate) {
      const res5 = await fetch(
        `https://my-brandbackend.herokuapp.com/api/blogs/${blogToUpdate}`
      );
      blogLoader.style.display = "none";
      if (res5.status !== 200) {
        alert("Error fetching the current blog info.");
        window.location.href = "/MY-BRAND";
      } else {
        const result5 = await res5.json();
        const {
          title,
          paragraph1,
          paragraph2,
          paragraph3,
          image1Url,
          image2Url,
          likes,
          dislikes,
          comments,
        } = result5;
        if (blogUpdateForm || singleBlog) blogToUpdateInfo = { ...result5 };
        if (blogUpdateForm) {
          titleField.value = title;
          paragraph1Field.value = paragraph1;
          paragraph2Field.value = paragraph2;
          paragraph3Field.value = paragraph3;
        }
        if (singleBlog) {
          document.title = title;
          const blogHeadline = singleBlogHeader.getElementsByTagName("span")[0],
            peopleReactions = singleBlogHeader.getElementsByTagName("div")[0],
            likesP = peopleReactions.children[0],
            likeIcon = likesP.getElementsByTagName("span")[0],
            likesContainer = likesP.getElementsByTagName("span")[1],
            dislikesP = peopleReactions.children[1],
            dislikeIcon = dislikesP.getElementsByTagName("span")[0],
            dislikesContainer = dislikesP.getElementsByTagName("span")[1],
            commentsP = peopleReactions.children[2],
            blogImage1 = singleBlog.querySelector("#blogImage1"),
            blogImage2 = singleBlog.querySelector("#blogImage2"),
            commentsNbr = document.querySelector("#commentsNbr");
          blogHeadline.innerHTML = title;
          singleBlog.querySelector("#blogPar1").innerHTML = paragraph1;
          singleBlog.querySelector("#blogPar2").innerHTML = paragraph2;
          singleBlog.querySelector("#blogPar3").innerHTML = paragraph3;
          blogImage1.setAttribute("src", image1Url);
          if (image2Url) blogImage2.setAttribute("src", image2Url);
          else blogImage2.style.display = "none";
          commentsNbr.innerHTML = comments.length;
          likesContainer.innerHTML = likes.length;
          dislikesContainer.innerHTML = dislikes.length;
          let likesNbr = likes.length,
            dislikesNbr = dislikes.length;
          commentsP.append(comments.length);
          likeIcon.setAttribute("data-icon", "fluent:thumb-like-20-regular");
          dislikeIcon.setAttribute("data-icon", "fluent:thumb-like-20-regular");
          let hasLiked = false,
            myLikeIndex = 0,
            hasDisliked = false,
            myDislikeIndex = 0;
          if (likes.length !== 0) {
            for (let i = 0; i < likes.length; i++) {
              if (likes[i].email === userEmail) {
                hasLiked = true;
                myLikeIndex = i;
                likeIcon.setAttribute(
                  "data-icon",
                  "fluent:thumb-like-20-filled"
                );
              }
            }
          }
          if (dislikes.length !== 0) {
            for (let i = 0; i < dislikes.length; i++) {
              if (dislikes[i].email === userEmail) {
                hasDisliked = true;
                myDislikeIndex = i;
                dislikeIcon.setAttribute(
                  "data-icon",
                  "fluent:thumb-like-20-filled"
                );
              }
            }
          }
          likesP.onclick = async () => {
            if (userEmail === "")
              alert(
                "Log in so as to be able to like, dislike or even comment on blogs."
              );
            else {
              const {
                  title,
                  paragraph1,
                  paragraph2,
                  paragraph3,
                  image1Url,
                  image2Url,
                  likes,
                  dislikes,
                  comments,
                } = blogToUpdateInfo,
                { token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
              let newBlogObj = {
                title,
                paragraph1,
                paragraph2,
                paragraph3,
                image1Url,
                image2Url,
                likes: [...likes],
                dislikes: [...dislikes],
                comments: [...comments],
              };
              likeIcon.removeAttribute("data-icon");
              likeIcon.hasAttribute("data-icon")
              if (likesNbr === 1) {
                dislikeIcon.setAttribute(
                  "data-icon",
                  "fluent:thumb-like-20-regular"
                );
                likesNbr = 0;
                newBlogObj.likes.splice(myLikeIndex, 1);
              } else {
                dislikeIcon.setAttribute(
                  "data-icon",
                  "fluent:thumb-like-20-fill"
                );
                likesNbr = 1;
                newBlogObj.likes.push({ email: userEmail });
                if (dislikesNbr === 1) {
                  dislikesNbr = 0;
                  newBlogObj.dislikes.splice(myDislikeIndex, 1);
                }
              }
              likesContainer.innerHTML = likesNbr;
              dislikesContainer.innerHTML = dislikesNbr;
              const res3 = await performUpdate(newBlogObj, blogToUpdate, token);
              if (res3.status !== 200)
                alert("Error liking / unliking this blog.Please try again.");
            }
          };
          dislikesP.onclick = async () => {
            if (userEmail === "")
              alert(
                "Log in so as to be able to like, dislike or even comment on blogs."
              );
            else {
              const {
                  title,
                  paragraph1,
                  paragraph2,
                  paragraph3,
                  image1Url,
                  image2Url,
                  likes,
                  dislikes,
                  comments,
                } = blogToUpdateInfo,
                { token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
              let newBlogObj = {
                title,
                paragraph1,
                paragraph2,
                paragraph3,
                image1Url,
                image2Url,
                likes: [...likes],
                dislikes: [...dislikes],
                comments: [...comments],
              };
              dislikeIcon.removeAttribute("data-icon");
              if (dislikesNbr === 1) {
                likeIcon.setAttribute(
                  "data-icon",
                  "fluent:thumb-like-20-regular"
                );
                dislikesNbr = 0;
                newBlogObj.dislikes.splice(myDislikeIndex, 1);
              } else {
                likeIcon.setAttribute("data-icon", "fluent:thumb-like-20-fill");
                dislikesNbr = 1;
                newBlogObj.dislikes.push({ email: userEmail });
                if (likesNbr === 1) {
                  likesNbr = 0;
                  newBlogObj.likes.splice(myLikeIndex, 1);
                }
              }
              dislikesContainer.innerHTML = dislikesNbr;
              likesContainer.innerHTML = likesNbr;
              const res3 = await performUpdate(newBlogObj, blogToUpdate, token);
              if (res3.status !== 200)
                alert(
                  "Error disliking / undisliking this blog.Please try again."
                );
            }
          };
          if (comments.length > 0) {
            document.querySelector("#noComments").style.display = "none";
            for (let j = 0; j < comments.length; j++) {
              const picDiv = document.createElement("div");
              picDiv.style.backgroundImage = `url('${comments[j].profilePicUrl}')`;
              const commentEl = document.createElement("div"),
                d2 = document.createElement("div"),
                h4 = document.createElement("h4"),
                txt1 = document.createTextNode(comments[j].names),
                p = document.createElement("p"),
                txt2 = document.createTextNode(comments[j].commentText),
                span = document.createElement("span"),
                txt3 = document.createTextNode("Portfolio Owner");
              commentEl.setAttribute("class", "comment");
              h4.append(txt1);
              p.append(txt2);
              if (comments[j].email === "yvesisite@gmail.com") {
                span.setAttribute("id", "portfolioOwnerBadge");
                span.append(txt3);
                h4.classList.add("portfolioOwnerCommentHeading");
                h4.appendChild(span);
              }
              d2.appendChild(h4);
              d2.appendChild(p);
              commentEl.appendChild(picDiv);
              commentEl.appendChild(d2);
              singleBlog.appendChild(commentEl);
            }
          }
        }
      }
    } else window.location.href = "/ui/admin-dashboard.html";
  }
};

window.onresize = () => {
  if (standardBlogs) {
    if (document.documentElement.clientWidth <= 637)
      document.documentElement.style.overflow = "auto";
    else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.style.overflow = "hidden";
    }
  }
};

const handleCommentSubmit = async () => {
  const user = {
    username: "Eric Kalisa",
    email: "erickalisa@gmail.com",
    role: "Standard",
  };
  localStorage.setItem("userInfo", JSON.stringify(user));
  let commentField = document.getElementById("blog-comment"),
    errorParagraph = document.getElementById("error-paragraph"),
    successSpan = document.getElementById("success-span"),
    errorsFound = false,
    success = false;
  commentField.value = commentField.value.trim();
  if (commentField.value == "") {
    errorParagraph.innerHTML = "Comment can't be empty.";
    errorsFound = true;
  } else {
    if (commentField.value.length < 3) {
      errorParagraph.innerHTML =
        "The comment must be at least 3 characters long.";
      errorsFound = true;
    } else {
      const commentObj = {
        names: userNames,
        email: userEmail,
        profilePicUrl: userProfilePicUrl,
        commentText: commentField.value,
      };
      const {
        title,
        paragraph1,
        paragraph2,
        paragraph3,
        image1Url,
        image2Url,
        likes,
        dislikes,
        comments,
      } = blogToUpdateInfo;
      let newBlogObj = {
        title,
        paragraph1,
        paragraph2,
        paragraph3,
        image1Url,
        image2Url,
        likes,
        dislikes,
        comments: [...comments],
      };
      newBlogObj.comments.push(commentObj);
      const { token } = JSON.parse(localStorage.getItem("iyPortfolioInfo"));
      formLoader.style.display = "block";
      const res3 = await performUpdate(newBlogObj, blogToUpdate, token);
      formLoader.style.display = "none";
      if (res3.status === 200) {
        success = true;
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        errorsFound = true;
        errorParagraph.innerHTML = "Error while posting your comment.";
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

function performUpdate(nBo, bTu, token) {
  const res3 = fetch(`https://my-brandbackend.herokuapp.com/api/blogs/${bTu}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: token,
    },
    body: JSON.stringify(nBo),
  });
  return res3;
}
