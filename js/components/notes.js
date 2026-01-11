/* ============================================
   Obscyra Shell — Notes Assistant Component
   ============================================ */

function renderNotes() {
    setContent(`
        <section class="panel">
            <h1>Case Notes Assistant</h1>
            <p class="text-soft">Structured notes, templates, and self‑checks for clean case documentation.</p>

            <div id="notes-container">

                <!-- Template Generator -->
                <div class="notes-section">
                    <h2>Generate Structured Notes</h2>

                    <div class="notes-row">
                        <textarea id="notes-issue" placeholder="Issue description..."></textarea>
                        <textarea id="notes-actions" placeholder="Actions taken..."></textarea>
                    </div>

                    <textarea id="notes-resolution" placeholder="Resolution / Next steps..."></textarea>

                    <div class="notes-template-buttons">
                        <button class="btn-small" id="notes-generate">Generate Notes</button>
                        <button class="btn-small" id="notes-clear">Clear</button>
                    </div>

                    <div class="notes-output" id="notes-output">Awaiting input...</div>
                </div>

                <!-- Self Checklist -->
                <div class="notes-section">
                    <h2>Self‑Check Before Closing</h2>

                    <div class="notes-checklist">
                        <label><input type="checkbox" class="notes-check"> Issue clearly described</label>
                        <label><input type="checkbox" class="notes-check"> Steps taken documented</label>
                        <label><input type="checkbox" class="notes-check"> Resolution or next steps included</label>
                        <label><input type="checkbox" class="notes-check"> User updated</label>
                        <label><input type="checkbox" class="notes-check"> Ticket categorized correctly</label>
                    </div>
                </div>

            </div>
        </section>
    `);

    initNotes();
}


/* ============================================
   Notes Assistant Logic
   ============================================ */

function initNotes() {

    /* -------------------------------
       GENERATE STRUCTURED NOTES
    --------------------------------*/
    on("#notes-generate", "click", () => {
        const issue = document.querySelector("#notes-issue").value.trim();
        const actions = document.querySelector("#notes-actions").value.trim();
        const resolution = document.querySelector("#notes-resolution").value.trim();
        const out = document.querySelector("#notes-output");

        if (!issue && !actions && !resolution) {
            out.textContent = "Please enter at least one field.";
            return;
        }

        const timestamp = formatDateTime();

        out.textContent =
`Case Notes — ${timestamp}
----------------------------------------
Issue:
${issue || "N/A"}

Actions Taken:
${actions || "N/A"}

Resolution / Next Steps:
${resolution || "N/A"}`;
    });


    /* -------------------------------
       CLEAR FIELDS
    --------------------------------*/
    on("#notes-clear", "click", () => {
        document.querySelector("#notes-issue").value = "";
        document.querySelector("#notes-actions").value = "";
        document.querySelector("#notes-resolution").value = "";
        document.querySelector("#notes-output").textContent = "Awaiting input...";
    });
}
