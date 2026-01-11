const routes = {
    home: () => renderDashboard(),
    toolkit: () => renderToolkit(),
    notes: () => renderNotes(),
    todo: () => renderTodo(),
    login: () => renderLogin(),
};

const protectedRoutes = ["home", "toolkit", "notes", "todo"];

function navigate(route) {
    if (!routes[route]) {
        return;
    }

    const protectedRoutes = ["home", "toolkit", "notes", "todo"]; 
    const loggedIn = localStorage.getItem("auth") !== null;

    if (protectedRoutes.includes(route) && !loggedIn) { 
        return navigate("login"); 
    }

    routes[route]();
    setActiveNav(route);

    if (window.location.hash !== `#${route}`) {
        history.replaceState(null, "", `#${route}`);
    }
}

window.addEventListener("load", () => {
    let route = window.location.hash.replace("#", "");
    if (!route || !routes[route]) {
        route = "home";
    }
    navigate(route);
});

window.addEventListener("hashchange", () => {
    const route = window.location.hash.replace("#", "");
    if (routes[route]) {
        navigate(route);
    }
});

function isAuth() {
    return localStorage.getItem("auth") === "true";
}




// return localStorage.getItem("authToken") !== null;