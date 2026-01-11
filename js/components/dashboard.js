function renderDashboard() {
    const user = localStorage.getItem("userID");
    const name = user ? user.split("@")[0] : "Guest";

    // Load recent tasks (max 5)
    let recent = [];
    try {
        const saved = JSON.parse(localStorage.getItem("todos") || "[]");
        recent = saved.slice(-5).reverse();
    } catch (e) {}

    setContent(`
        <section class="panel dashboard">
            <h1>Welcome, <span class="text-accent">${name}</span></h1>
            <p class="text-soft">Your Obscyra Shell workspace at a glance.</p>

            <!-- Quick Launch Grid -->
            <div id="dash-grid">
                <div class="dash-tile" data-route="toolkit">
                    <h2>Toolkit</h2>
                    <p>Utilities & diagnostics</p>
                </div>

                <div class="dash-tile" data-route="notes">
                    <h2>Notes</h2>
                    <p>Structured ticket notes</p>
                </div>

                <div class="dash-tile" data-route="todo">
                    <h2>To‑Do</h2>
                    <p>Tasks</p>
                </div>

                <div class="dash-tile" data-route="login">
                    <h2>Account</h2>
                    <p>Login & settings</p>
                </div>
            </div>

            <!-- Recent Tasks -->
            <div class="dash-section">
                <h2>Recent Tasks</h2>
                <ul id="dash-recent">
                    ${
                        recent.length === 0
                        ? `<li class="empty">No recent tasks</li>`
                        : recent.map(t => `
                            <li>
                                <span class="task-title">${t.text}</span>
                                <span class="task-time">${t.timestamp}</span>
                            </li>
                        `).join("")
                    }
                </ul>
            </div>

        </section>
    `);

    initDashboard();
}

function initDashboard() {
    document.querySelectorAll(".dash-tile").forEach(tile => {
        tile.addEventListener("click", () => {
            const route = tile.dataset.route;
            navigate(route);
        });
    });
}
