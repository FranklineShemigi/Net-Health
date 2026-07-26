// ===== REGISTER =====

const registerForm = document.querySelector("#register-form");

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        localStorage.setItem("loggedIn", "true");

        window.location.href = "../dashboard/dashboard.html";

    });

}

// ===== LOGIN =====

const loginForm = document.querySelector("#login-form");

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        localStorage.setItem("loggedIn", "true");

        window.location.href = "../dashboard/dashboard.html";

    });

}