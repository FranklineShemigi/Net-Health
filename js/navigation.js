// ===== SIDEBAR =====

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector("#sidebar");

if (menuBtn && closeBtn && sidebar) {

    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

}

// ===== LOGOUT =====

const logoutBtn = document.querySelector("#logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", (event) => {

        event.preventDefault();

        localStorage.removeItem("loggedIn");

        window.location.href = "../index.html";

    });

}