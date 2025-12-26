const email = document.getElementById("acc-email");
const password = document.getElementById("acc-pass");
const btnLogin = document.getElementById("acc-login");

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

    window.location.href = "index.html";
}

btnLogin.addEventListener("click", login);
password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        login();
    }
})

