(function () {
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Photos that come from GitHub fall back to the local file if they fail to load.
  Array.prototype.forEach.call(document.querySelectorAll("img[data-fallback]"), function (img) {
    img.addEventListener("error", function () {
      var fallback = img.getAttribute("data-fallback");
      if (fallback && img.getAttribute("src") !== fallback) img.setAttribute("src", fallback);
    });
  });
})();
