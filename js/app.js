function setContent(html) {
  const root = document.getElementById("app-root");
  root.innerHTML = html;
}

function on(selector, event, handler) {
  const elements = document.querySelector(selector);
  if (elements) elements.addEventListener(event, handler);
}

function setActiveNav(route) {
  document.querySelectorAll("#top-nav .nav-links a").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === route);
  });
}

function formatDateTime(date = new Date()) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${d}/${m}/${y} ${h}:${min}`;
}
