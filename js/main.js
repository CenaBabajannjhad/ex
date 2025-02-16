import {getCookie} from "./util/cookies/cookies.js"
import handlerMenu from "./util/hamburger-menu/hamburgerMenu.js";

document.addEventListener("DOMContentLoaded", () => {
  // navbar config
  const menuButton = document.querySelector("#menu__button");
  const closeMenuButton = document.querySelector("#close__button");
  menuButton.addEventListener("click", handlerMenu);
  closeMenuButton.addEventListener("click", handlerMenu);

  // username
  const userNamePlace = document.querySelector("#userName");
  const userName = getCookie("userName");

  if(userName){
    document.querySelector("#headerActions").classList.add("hidden");
    document.querySelector("#userAvatarDesktop").classList.remove("hidden");
    userNamePlace.textContent = userName;
  }

  

});
