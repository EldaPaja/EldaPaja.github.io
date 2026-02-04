(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase() === path) a.classList.add("active");
  });
})();

// ===== Recent news (homepage sidebar) =====
(async function () {
  const container = document.getElementById("recent-news");
  if (!container) return;

  try {
    const res = await fetch("news.html", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch news.html");

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Your news items are <section> blocks inside .primary-content
    const newsSections = doc.querySelectorAll(".primary-content > section");

    container.innerHTML = "";

    const take = Array.from(newsSections).slice(0, 2); // show 2 (change to 1 if you want)
    take.forEach(sec => {
      const h2 = sec.querySelector("h2");
      const firstP = sec.querySelector("p");

      const title = h2 ? h2.textContent.trim() : "News";
      const excerpt = firstP ? firstP.innerHTML.trim() : "";

      const card = document.createElement("div");
      card.className = "item";
      card.innerHTML = `
        <strong>${escapeHtml(title)}</strong>
        <div class="muted small">${excerpt} <a href="news.html">More…</a></div>
      `;

      container.appendChild(card);
    });

    if (container.children.length === 0) {
      container.innerHTML = `<div class="muted small">No news yet. <a href="news.html">View news</a></div>`;
    }
  } catch (e) {
    container.innerHTML = `<div class="muted small">Could not load news. <a href="news.html">View news</a></div>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));
  }
})();

