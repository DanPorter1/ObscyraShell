/* ============================================
   Obscyra Shell — Toolkit Component
   ============================================ */

function renderToolkit() {
    setContent(`
        <section class="panel">
            <h1>Service Desk Toolkit</h1>
            <p class="text-soft">Quick utilities for triage, diagnostics, and case handling.</p>

            <div id="toolkit-container">

                <!-- IP Lookup -->
                <div class="toolkit-section">
                    <h2>IP Lookup</h2>
                    <div class="toolkit-row">
                        <input type="text" id="ip-input" placeholder="Enter IP or domain...">
                        <button class="btn" id="ip-btn">Lookup</button>
                    </div>
                    <div class="toolkit-output" id="ip-output">Awaiting input...</div>
                </div>

                <!-- Ping Template -->
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


/* ============================================
   Toolkit Logic
   ============================================ */

function initToolkit() {

    /* -------------------------------
       IP LOOKUP
    --------------------------------*/
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
            `• ping ${ip} -n 4\n\n` +
            `Use these commands in CMD or PowerShell.`;
    });


    /* -------------------------------
       PING TEMPLATE
    --------------------------------*/
    on("#ping-btn", "click", () => {
        const host = document.querySelector("#ping-input").value.trim();
        const out = document.querySelector("#ping-output");

        if (!host) {
            out.textContent = "Please enter a hostname or IP.";
            return;
        }

        out.textContent =
`Test Connectivity Script
-------------------------
ping ${host} -n 4

if ($LASTEXITCODE -eq 0) {
    Write-Host "Ping successful" -ForegroundColor Green
} else {
    Write-Host "Ping failed" -ForegroundColor Red
}`;
    });


    /* -------------------------------
       PASSWORD GENERATOR
    --------------------------------*/
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
