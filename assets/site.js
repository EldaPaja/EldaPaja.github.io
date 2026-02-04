(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase() === path) a.classList.add("active");
  });
})();

// ===== Recent news on homepage =====
(async function () {
  const container = document.getElementById("recent-news");
  if (!container) return;

  try {
    const res = await fetch("news.html");
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");
    const items = doc.querySelectorAll(".item");

    container.innerHTML = "";

    // Show first 2 items (change to 1 if you want only one)
    Array.from(items).slice(0, 2).forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });

    if (container.children.length === 0) {
      container.innerHTML = `<div class="muted small">No news yet.</div>`;
    }
  } catch (e) {
    container.innerHTML = `<div class="muted small">Could not load news.</div>`;
  }
})();
