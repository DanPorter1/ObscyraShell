function renderToolkit() {
    setContent(`
        <section class="panel">
            <h1>Service Desk Toolkit - Still in development.</h1>
            <p class="text-soft">Quick utilities diagnostics, and ticket updates.</p>

            <div id="toolkit-container">
                <div class="toolkit-section">
                    <h2>IP Lookup</h2>
                    <div class="toolkit-row">
                        <input type="text" id="ip-input" placeholder="Enter IP or domain...">
                        <button class="btn" id="ip-btn">Lookup</button>
                    </div>
                    <div class="toolkit-output" id="ip-output">Awaiting input...</div>
                </div>

                <div class="toolkit-section">
                    <h2>Ping Template</h2>
                    <textarea id="ping-input" placeholder="Enter hostname or IP..."></textarea>
                    <button class="btn" id="ping-btn">Generate Ping Script</button>
                    <div class="toolkit-output" id="ping-output">Awaiting input...</div>
                </div>

                <!-- Password Generator -->
                <div class="toolkit-section">
                    <h2>Password Generator</h2>
                    <div class="toolkit-row">
                        <input type="text" id="pw-length" placeholder="Length (e.g. 12)">
                        <button class="btn" id="pw-btn">Generate</button>
                    </div>
                    <div class="toolkit-output" id="pw-output">Awaiting input...</div>
                </div>

            </div>
        </section>
    `);

    initToolkit();
}

function initToolkit() {
    on("#ip-btn", "click", () => {
        const ip = document.querySelector("#ip-input").value.trim();
        const out = document.querySelector("#ip-output");

        if (!ip) {
            out.textContent = "Please enter an IP or domain.";
            return;
        }

        out.textContent = `Running lookup for: ${ip}\n\n` +
            `• nslookup ${ip}\n` +
            `• tracert ${ip}\n` +
            `• ping ${ip}\n\n` +
            `Use these commands in CMD or PowerShell.`;
    });

    on("#ping-btn", "click", () => {
        const host = document.querySelector("#ping-input").value.trim();
        const out = document.querySelector("#ping-output");

        if (!host) {
            out.textContent = "Please enter a hostname or IP.";
            return;
        }

        // TODO finish ping scripting
        out.textContent =
`Test Connectivity Script
-------------------------
ping ${host}

In progress sorry `;
    });

    on("#pw-btn", "click", () => {
        const len = parseInt(document.querySelector("#pw-length").value.trim());
        const out = document.querySelector("#pw-output");

        if (!len || len < 4) {
            out.textContent = "Enter a valid length (minimum 4).";
            return;
        }

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let pw = "";

        for (let i = 0; i < len; i++) {
            pw += chars[Math.floor(Math.random() * chars.length)];
        }

        out.textContent = pw;
    });
}
