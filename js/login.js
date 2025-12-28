const email = document.getElementById("acc-email");
const password = document.getElementById("acc-pass");
const btnLogin = document.getElementById("acc-login");
const accH1 = document.getElementById("acc-form-h1");
const regLink = document.getElementById("reg-link");
const logLink = document.getElementById("log-link");
const logIn = document.getElementById("log-form");
const regForm = document.getElementById("reg-form");
const cookies = document.getElementById("cookies");
const privacy = document.getElementById("privacy-policy");

async function login() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if (!emailValue || !passwordValue) {
        alert("Something is missing!");
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
}

//TODO: Already Logged in logic 

function accoutView(title, show) {
    accH1.textContent = title;
    logIn.style.display = "none";
    regForm.style.display = "none";
    privacy.style.display = "none";

    show.style.display = "block";
}

regLink.addEventListener("click", () => {
    accoutView("Register", regForm)

});

logLink.addEventListener("click", () => {
    accoutView("Log In", logIn)
});

cookies.addEventListener("click", () => {
    accoutView("Privacy Policy & Cookies", privacy)
});

document.getElementById("backLink").addEventListener("click", () => {
    accoutView("Register", regForm)
})