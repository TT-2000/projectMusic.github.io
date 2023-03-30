/* ----------------open/close list song--------------- */

const iconListSong = document.querySelector("#icon-list_song");
const iconClose = document.querySelector(".playlist-song-heading i");
const listSong = document.querySelector(".playlist-song");

iconListSong.onclick = () => {
  const toggleList = listSong.classList.toggle("active");
  if (toggleList == true) {
    
    listSong.style.opacity = "1";
  } else {
    listSong.style.opacity = "0.3";

  }
};

iconClose.onclick = () => {
  listSong.classList.remove("active");
  listSong.style.opacity = "0.3";
};


/* ------Menu responsive active------- */

const bars = document.querySelector(".bars");
const activeMenuSidebar = document.querySelector(".menu-sidebar ");

bars.onclick = () => {
  activeMenuSidebar.classList.toggle("active");
};
