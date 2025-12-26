document.addEventListener("DOMContentLoaded", () => protect());

async function protect() {
    document.body.style.display = "none";

    const WORKER_URL = "https://ancient-term-4335.danporter-36a.workers.dev";
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "home.html";
        return;
    }

    try {
        const res = await fetch(`${WORKER_URL}/api/verify`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
            document.body.style.display = "block";
        } else {
            localStorage.removeItem("authToken");
            window.location.href = "home.html?expired=1";
        }
    } catch (err) {
        localStorage.removeItem("authToken");
        window.location.href = "home.html?expired=1";
    }
}