/* ==========================================================
   Script portofolio Nurhafatsa
   1. Tahun otomatis di footer
   2. Tema terang/gelap (tersimpan di peramban)
   3. Menu aktif saat halaman di-scroll
   ========================================================== */

(function () {
  "use strict";

  /* 1. Tahun footer */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* 2. Tema */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var KEY = "tema-portofolio";

  try {
    var saved = localStorage.getItem(KEY);
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) { /* penyimpanan tidak tersedia, abaikan */ }

  function isDark() {
    var set = root.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* abaikan */ }
    });
  }

  /* 3. Menu aktif */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }
})();
