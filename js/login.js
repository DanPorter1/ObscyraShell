const email = document.getElementById("acc-email");
const password = document.getElementById("acc-pass");
const errorEmail = document.getElementById("error-email");
const errorPass = document.getElementById("error-pass");
const btnLogin = document.getElementById("acc-login");
const accH1 = document.getElementById("acc-form-h1");
const regLink = document.getElementById("reg-link");
const logLink = document.getElementById("log-link");
const logIn = document.getElementById("log-form");
const regForm = document.getElementById("reg-form");
const regEmail = document.getElementById("reg-email");
const regPass = document.getElementById("reg-pass");
const regBtn = document.getElementById("acc-reg");
const errorREmail = document.getElementById("error-remail");
const errorRPass = document.getElementById("error-rpass");
const cookies = document.getElementById("cookies");
const privacy = document.getElementById("privacy-policy");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^[a-zA-Z0-9]{8,}$/;
const accLogout = document.getElementById("logout");
const logoutBtn = document.getElementById("logout-btn");


// LOGIN
async function login() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (!emailValue || !emailPattern.test(emailValue)) {
        showError(errorEmail, "Must be a valid email!")
        return;
        // TODO remove devtest
    } else if (!passwordValue || !passwordPattern.test(passwordValue) && passwordValue !== "test123") {
        showError(errorPass, "Password must be 8 characters long")
        return;
    }

    btnLogin.disabled = true; 
    btnLogin.value = "Logging in...";

    const browser = navigator.userAgentData?.brands?.[0]?.brand || navigator.userAgent;

    const res = await fetch("https://ancient-term-4335.danporter-36a.workers.dev/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            browser: browser
        })
    }); 

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "Login failed");
        btnLogin.disabled = false;
        btnLogin.value = "Log-in";
        return;
    }

    localStorage.setItem("authToken", data.token);
    window.location.href = "to-do.html";
}

function showError(element, message) {
    element.textContent = message;

    setTimeout(() => {
        element.textContent = "";
    }, 2000);
}


btnLogin.addEventListener("click", login);
password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        login();
    }
})

const token = localStorage.getItem("authToken");
if (token) { 
    accH1.textContent = "Logged In";
    logIn.style.display = "none";
    accLogout.style.display = "";
}

// REGISTER
async function register() {
    const rEmailValue = regEmail.value.trim();
    const rPasswordValue = regPass.value.trim();

    if (!rEmailValue || !emailPattern.test(rEmailValue)) {
        showError(errorREmail, "Must be a valid email!")
        return;
    } else if (!rPasswordValue || !passwordPattern.test(rPasswordValue)) {
        showError(errorRPass, "Password must be 8 characters long")
        return;
    }

    regBtn.disabled = true; 
    regBtn.value = "Registering...";

    const res = await fetch("https://ancient-term-4335.danporter-36a.workers.dev/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: rEmailValue,
            password: rPasswordValue,
        })
    }); 

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || "Email already exists");
        regBtn.disabled = false;
        regBtn.value = "Register";
        alert("Email already exists");
        accH1.textContent = "Email already exists - Please try a different E-mail"
        return;
    }

    regForm.style.display = "none";
    logIn.style.display = "block";
    accH1.textContent = "Account Registered - Please log in"

}

regBtn.addEventListener("click", register);
regPass.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        register();
    }
})

// ACC VIEWS
function accountView(title, show) {
    accH1.textContent = title;
    logIn.style.display = "none";
    regForm.style.display = "none";
    privacy.style.display = "none";


    show.style.display = "block";
}

regLink.addEventListener("click", () => {
    accountView("Register", regForm)
});

logLink.addEventListener("click", () => {
    accountView("Log In", logIn)
});

cookies.addEventListener("click", () => {
    accountView("Privacy Policy & Cookies", privacy)
});

document.getElementById("backLink").addEventListener("click", () => {
    accountView("Register", regForm)
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authToken")
    accLogout.style.display = "none";
    accountView("Log In", logIn)
});
