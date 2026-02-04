(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase() === path) a.classList.add("active");
  });
})();