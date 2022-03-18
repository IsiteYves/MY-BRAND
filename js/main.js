// const menuBlockLink = document.querySelector("#menu-block-link");
// menuBlockLink.onclick = () => {
//   const { host } = window.location;
//   window.location = host;
// };
const menuIcon = document.querySelector("#menuIcon"),
  menubarRemoveIcon = document.getElementById("menu-block-link");
menuIcon.addEventListener("click", () => {
  document.getElementsByClassName("Menubar")[0].style.display = "block";
});
menubarRemoveIcon.onclick = () => {
  document.getElementsByClassName("Menubar")[0].style.display = "none";
};
