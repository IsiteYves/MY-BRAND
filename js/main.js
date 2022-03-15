const menuBlockLink = document.querySelector("#menu-block-link");
menuBlockLink.onclick = () => {
  const { host } = window.location;
  window.location = host;
};
