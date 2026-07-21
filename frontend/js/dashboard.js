// ===== Protect Dashboard =====

if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "../auth/login.html";

}

// ===== Sidebar =====

const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebar = document.querySelector("#sidebar");

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    sidebar.classList.remove("active");

});

// ===== Logout =====

const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", (event) => {

    event.preventDefault();

    localStorage.removeItem("loggedIn");

    window.location.href = "../index.html";

});