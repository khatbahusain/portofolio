(function () {
  var root = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // year
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // language
  var titles = {
    fr: "Husain Khatba · Ingénieur IA & Data Engineer",
    en: "Husain Khatba · AI Engineer & Data Engineer",
  };
  function setLang(l) {
    root.lang = l;
    document.title = titles[l];
    save("lang", l);
  }
  setLang(root.lang === "en" ? "en" : "fr");
  document.getElementById("lang-toggle").addEventListener("click", function () {
    setLang(root.lang === "fr" ? "en" : "fr");
  });

  // theme
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var current = root.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    save("theme", next);
  });

  // reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
