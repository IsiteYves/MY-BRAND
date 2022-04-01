if (document.getElementsByClassName("menu-block-link")[0]) {
  const menuBlockLink = document.getElementsByClassName("menu-block-link")[0];
  menuBlockLink.onclick = (e) => {
    // console.log(e.target.id);
    const isCloseClicked = e.target.id == "menubarRemoveIcon";
    if (isCloseClicked) return;
    if (!isCloseClicked) {
      document.location.href = "/MY-BRAND";
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
function getUserInfoFromLocalStorage() {
  if (
    document.getElementById("username") &&
    document.getElementById("email") &&
    document.getElementById("user-role")
  ) {
    let usernameEl = document.getElementById("username"),
      emailEl = document.getElementById("email"),
      userRoleEl = document.getElementById("user-role");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      document.location.href = "/ui/login.html";
    } else {
      const { username, email, role } = userInfo;
      usernameEl.innerHTML = username;
      emailEl.innerHTML = email;
      userRoleEl.innerHTML = role;
    }
  }
}
function logout() {
  localStorage.removeItem("userInfo");
}
window.onload = () => {
  getUserInfoFromLocalStorage();
};
