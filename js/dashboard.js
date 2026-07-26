// ===== Protect Dashboard =====

if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "../auth/login.html";

}

