function openNav() {
  if (window.innerWidth >= 768)
    document.getElementById("mySidenav").style.width = "250px";

  if (window.innerWidth < 768)
    document.getElementById("mySidenav").style.width = "100vw";

  document.getElementById("preSidenav").classList.add("visivel");
}

function closeNav() {
  document.getElementById("preSidenav").classList.remove("visivel");
  document.getElementById("mySidenav").style.width = "0";
}
