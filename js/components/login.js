function renderLogin() {
    const user = localStorage.getItem("obscyra_user");
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
            // TODO Remove cookie
            navigate("login");
        });

        return;
    }

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

function initLogin() {
    on("#go-register", "click", (e) => {
        e.preventDefault();
        renderRegister();
    });

    on("#go-privacy", "click", (e) => {
        e.preventDefault();
        renderPrivacy();
    });

    // TODO log in logic
    on("#login-btn", "click", () => {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const emailErr = document.getElementById("login-email-error");
        const passErr = document.getElementById("login-password-error");

        emailErr.textContent = "";
        passErr.textContent = "";

        const result = loginLogic(email, password); 
        if (!result.valid) { 
            if (result.field === "email") { 
                emailErr.textContent = result.message; 
            } else { 
                passErr.textContent = result.message; 
            } return; 
        }

        // Fake login success
        localStorage.setItem("obscyra_user", email);
        navigate("login");
    });
}

function renderRegister() {
    setContent(`
        <section class="panel login">
            <h1>Create Account</h1>

            <div id="register-container">

                <div class="login-form-group">
                    <label>Name</label>
                    <input type="name" id="reg-name" placeholder="">
                    <div class="error-msg" id="reg-name-error"></div>
                </div>

                <div class="login-form-group">
                    <label>Email</label>
                    <input type="email" id="reg-email" placeholder="you@example.com">
                    <div class="error-msg" id="reg-email-error"></div>
                </div>

                <div class="login-form-group">
                    <label>Password</label>
                    <input type="password" id="reg-password" placeholder="••••••••">
                    <div class="error-msg" id="reg-password-error"></div>
                    <label>Re-Enter Password</label>
                    <input type="password" id="reg-re-password" placeholder="••••••••">
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
        // TODO Validate username -- Add username to DB 
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value.trim();
        const rePassword = document.getElementById("reg-re-password").value.trim();

        const emailErr = document.getElementById("reg-email-error");
        const passErr = document.getElementById("reg-password-error");

        emailErr.textContent = "";
        passErr.textContent = "";

        const result = loginLogic(email, password); 
        if (!result.valid) { 
            if (result.field === "email") { 
                emailErr.textContent = result.message; 
            } else { 
                passErr.textContent = result.message; 
            } return; 
        }

        if (password !== rePassword) {
            passErr.textContent = "Passwords do not match!";
            return;
        }

        // TODO Registration Logic
        localStorage.setItem("obscyra_user", email);
        navigate("login");
    });
}

function renderPrivacy() {
    setContent(`
        <section class="panel login">
            <h1>Privacy Policy</h1>

            <div id="privacy-container">
                <p class="text-soft">
                    This privacy policy explains how Obscyra Shell collects, stores, and uses your information.
                </p>

                <h2>Data Collected</h2>
                <p>The following information is stored securely on the server when you create or use an account:</p>
                <ul>
                    <li>Username</li>
                    <li>Email address</li>
                    <li>Hashed password</li>
                    <li>Login timestamps</li>
                    <li>Current browser information</li>
                </ul>

                <h2>Purpose of Data Storage</h2>
                <p>Your data is stored for the following reasons:</p>
                <ul>
                    <li>To create and maintain your user account</li>
                    <li>To authenticate your identity during login</li>
                    <li>To improve security by tracking login activity</li>
                    <li>To help detect unusual or unauthorized access attempts</li>
                    <li>To ensure the app functions correctly across different browsers</li>
                </ul>

                <h2>How Your Data Is Used</h2>
                <p>Your information is used only for essential app functionality:</p>
                <ul>
                    <li>Verifying your login credentials</li>
                    <li>Displaying your account information</li>
                <li>Maintaining secure access to your account</li>
                    <li>Improving reliability and user experience</li>
                </ul>

                <h2>Local Storage</h2>
                <p>Your To-Do items and certain preferences are stored only in your browser's local storage:</p>
                <ul>
                    <li>To-Do list items</li>
                    <li>Local UI preferences</li>
                </ul>
                <p class="text-soft">
                    This information never leaves your device and is not transmitted to the server.
                </p>

                <h2>Data Sharing</h2>
                <p>
                    Obscyra Shell does not sell, trade, or share your personal information with third parties.
                    Your data is only used internally for authentication and security purposes.
                </p>
                <p>
                    Data may be disclosed only if required by law or necessary to protect the security and integrity of the service.
                </p>

                <h2>Security</h2>
                <p>
                    Passwords are stored only as hashed values. Plain-text passwords are never saved.
                    All server-stored data is protected using industry-standard security practices.
                </p>

                <a id="privacy-back">Back to login</a>
            </div>
        </section>
    `);

    on("#privacy-back", "click", () => renderLogin());
}


function loginLogic(email, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,}$/;

    if (!email) {
        return { valid: false, field: "email", message: "Email is required." };
    }
    if (!emailPattern.test(email)) {
        return { valid: false, field: "email", message: "Invalid email format." };
    }
    if (!password) {
        return { valid: false, field: "password", message: "Password is required." };
    }
    if (!passwordPattern.test(password)) {
        return { valid: false, field: "password", message: "Password must be at least 8 characters (letters or numbers)." };
    }

    return { valid: true };
}
