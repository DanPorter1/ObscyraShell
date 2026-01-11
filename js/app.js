/* ============================================
   Obscyra Shell — Core App Utilities
   ============================================ */

/**
 * Injects HTML into the SPA root container.
 * Automatically applies fade‑in animation.
 */
function setContent(html) {
    const root = document.getElementById("app-root");
    root.innerHTML = html;

    // Trigger fade animation
    root.classList.remove("fade");
    void root.offsetWidth; // reflow
    root.classList.add("fade");
}

/**
 * Helper to safely bind events.
 */
function on(selector, event, handler) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler);
}

/**
 * Highlights the active navigation link.
 */
function setActiveNav(route) {
    document.querySelectorAll("#top-nav .nav-links a").forEach(a => {
        a.classList.toggle("active", a.dataset.route === route);
    });
}

/**
 * Highlights the active sidebar item (future use).
 */
function setActiveSidebar(route) {
    document.querySelectorAll("#sidebar .sidebar-nav li").forEach(li => {
        li.classList.toggle("active", li.dataset.route === route);
    });
}

/**
 * Utility: format date/time for To‑Do list.
 */
function formatDateTime(date = new Date()) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${d}/${m}/${y} ${h}:${min}`;
}
