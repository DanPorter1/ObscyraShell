/* ============================================
   Obscyra Shell — Login / Register Component
   ============================================ */

function renderLogin() {
    const user = localStorage.getItem("obscyra_user");

    // If logged in, show logout panel
    if (user) {
        setContent(`
            <section class="panel login">
                <h1>Account</h1>
                <div id="logout-container">
                    <p>You are logged in as <span class="text-accent">${user}</span>.</p>
                    <button class="btn" id="logout-btn">Log Out</button>
                </div>
            </section>
        `);

        on("#logout-btn", "click", () => {
            localStorage.removeItem("obscyra_user");
            navigate("login");
        });

        return;
    }

    // Otherwise show login form
    setContent(`
        <section class="panel login">
            <h1>Log In</h1>

            <div id="login-container">
                <div class="login-form-group">
                    <label>Email</label>
                    <input type="email" id="login-email" placeholder="you@example.com">
                    <div class="error-msg" id="login-email-error"></div>
                </div>

                <div class="login-form-group">
                    <label>Password</label>
                    <input type="password" id="login-password" placeholder="••••••••">
                    <div class="error-msg" id="login-password-error"></div>
                </div>

                <button class="submit-btn" id="login-btn">Log In</button>

                <div class="login-links">
                    <a href="#" id="go-register">Create account</a>
                    <a href="#" id="go-privacy">Privacy policy</a>
                </div>
            </div>
        </section>
    `);

    initLogin();
}


/* ============================================
   Login Logic
   ============================================ */

function initLogin() {

    /* -------------------------------
       NAVIGATION LINKS
    --------------------------------*/
    on("#go-register", "click", (e) => {
        e.preventDefault();
        renderRegister();
    });

    on("#go-privacy", "click", (e) => {
        e.preventDefault();
        renderPrivacy();
    });


    /* -------------------------------
       LOGIN BUTTON
    --------------------------------*/
    on("#login-btn", "click", () => {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const emailErr = document.getElementById("login-email-error");
        const passErr = document.getElementById("login-password-error");

        emailErr.textContent = "";
        passErr.textContent = "";

        if (!email) {
            emailErr.textContent = "Email is required.";
            return;
        }

        if (!password) {
            passErr.textContent = "Password is required.";
            return;
        }

        // Fake login success
        localStorage.setItem("obscyra_user", email);
        navigate("login");
    });
}


/* ============================================
   REGISTER COMPONENT
   ============================================ */

function renderRegister() {
    setContent(`
        <section class="panel login">
            <h1>Create Account</h1>

            <div id="register-container">
                <div class="login-form-group">
                    <label>Email</label>
                    <input type="email" id="reg-email" placeholder="you@example.com">
                    <div class="error-msg" id="reg-email-error"></div>
                </div>

                <div class="login-form-group">
                    <label>Password</label>
                    <input type="password" id="reg-password" placeholder="••••••••">
                    <div class="error-msg" id="reg-password-error"></div>
                </div>

                <button class="submit-btn" id="reg-btn">Register</button>

                <div class="login-links">
                    <a href="#" id="reg-back">Back to login</a>
                </div>
            </div>
        </section>
    `);

    initRegister();
}

function initRegister() {
    on("#reg-back", "click", (e) => {
        e.preventDefault();
        renderLogin();
    });

    on("#reg-btn", "click", () => {
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value.trim();

        const emailErr = document.getElementById("reg-email-error");
        const passErr = document.getElementById("reg-password-error");

        emailErr.textContent = "";
        passErr.textContent = "";

        if (!email) {
            emailErr.textContent = "Email is required.";
            return;
        }

        if (!password) {
            passErr.textContent = "Password is required.";
            return;
        }

        // Fake registration success
        localStorage.setItem("obscyra_user", email);
        navigate("login");
    });
}


/* ============================================
   PRIVACY POLICY COMPONENT
   ============================================ */

function renderPrivacy() {
    setContent(`
        <section class="panel login">
            <h1>Privacy Policy</h1>

            <div id="privacy-container">
                <p class="text-soft">
                    This is a placeholder privacy policy for Obscyra Shell.
                    Replace this text with your real policy when ready.
                </p>

                <h2>Data Storage</h2>
                <p>Only minimal data is stored locally in your browser:</p>
                <ul>
                    <li>Login email</li>
                    <li>To‑Do list items</li>
                    <li>Preferences</li>
                </ul>

                <h2>Security</h2>
                <p>
                    No data is transmitted to any server. Everything stays on your device.
                </p>

                <a id="privacy-back">Back to login</a>
            </div>
        </section>
    `);

    on("#privacy-back", "click", () => renderLogin());
}
