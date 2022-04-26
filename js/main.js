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
      // document.location.href = "/ui/login.html";
      document.location.href = "/MY-BRAND/ui/login.html";
    } else {
      const { _id, token } = JSON.parse(
        localStorage.getItem("iyPortfolioInfo")
      );
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
        const { names, email, role } = result;
        if (role !== "Admin") document.location.href = "/ui/login.html";
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
        `https://my-brandbackend.herokuapp.com/api/user/${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        const result = await res.json();
        if (signedInUsernames) signedInUsernames.innerHTML = result.names;
        if (result.role !== "Admin") {
          if (signedInUsernames)
            document.getElementById("signedInRole").innerHTML = "Standard User";
        } else {
          if (signedInUsernames) execShow();
          if (commentForm) commentForm.style.display = "none";
        }
      } else {
        if (signedInUsernames) execShow();
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
    document.location.href = "/ui/about-me.html";
    // document.location.href = "/MY-BRAND/ui/about-me.html";
  };
}

function changePage(to) {
  document.location.href = `/MY-BRAND/ui/${to}`;
}
function logout() {
  localStorage.removeItem("iyPortfolioInfo");
}
window.onload = () => {
  getUserInfoFromLocalStorage();
};
