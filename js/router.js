/* ============================================
   Obscyra Shell — SPA Router
   ============================================ */

/**
 * Route table — maps route names to component render functions.
 * These functions come from the component JS files.
 */
const routes = {
    home: () => renderDashboard(),
    toolkit: () => renderToolkit(),
    notes: () => renderNotes(),
    todo: () => renderTodo(),
    login: () => renderLogin(),
};

/**
 * Navigate to a route.
 * Updates the URL hash, loads the component, and highlights nav.
 */
function navigate(route) {
    if (!routes[route]) {
        console.warn(`Unknown route: ${route}`);
        return;
    }

    // Load component
    routes[route]();

    // Highlight top nav
    setActiveNav(route);

    // Highlight sidebar (future)
    setActiveSidebar(route);

    // Update hash without jumping scroll
    if (window.location.hash !== `#${route}`) {
        history.replaceState(null, "", `#${route}`);
    }
}

/**
 * Initialize router on page load.
 */
window.addEventListener("load", () => {
    let route = window.location.hash.replace("#", "");

    // Default route
    if (!route || !routes[route]) {
        route = "home";
    }

    navigate(route);
});

/**
 * Listen for hash changes (user manually changes URL).
 */
window.addEventListener("hashchange", () => {
    const route = window.location.hash.replace("#", "");
    if (routes[route]) {
        navigate(route);
    }
});
