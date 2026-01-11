function renderNotes() {
    setContent(`
        <section class="panel">
            <h1>Ticket Notes Assistant</h1>
            <p class="text-soft">Structured notes, templates, and self-checks for clean ticket documentation.</p>

            <div id="notes-container">
                <div class="notes-section">
                    <h2>Generate Structured Notes</h2>

                    <div class="notes-row">
                        <textarea id="notes-issue" placeholder="Issue description..."></textarea>
                        <textarea id="notes-actions" placeholder="Actions taken..."></textarea>
                        <textarea id="notes-resolution" placeholder="Resolution / Next steps..."></textarea>
                    </div>

                    <div class="notes-template-buttons">
                        <button class="btn-small" id="notes-generate">Generate Notes</button>
                        <button class="btn-small" id="notes-clear">Clear</button>
                    </div>

                    <div class="notes-output" id="notes-output">Awaiting input...</div>
                </div>

        </section>
    `);

    initNotes();
}

function initNotes() {
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

        out.textContent =`Ticket Notes — ${timestamp}
----------------------------------------
Issue:
${issue || "N/A"}

Actions Taken:
${actions || "N/A"}

Resolution / Next Steps:
${resolution || "N/A"}`;
    });

    on("#notes-clear", "click", () => {
        document.querySelector("#notes-issue").value = "";
        document.querySelector("#notes-actions").value = "";
        document.querySelector("#notes-resolution").value = "";
        document.querySelector("#notes-output").textContent = "Awaiting input...";
    });
}
