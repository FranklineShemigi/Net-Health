// ==========================================
// NET-HEALTH NAVIGATION
// ==========================================


// ==========================================
// HOMEPAGE MOBILE NAVIGATION
// ==========================================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


// ==========================================
// DASHBOARD SIDEBAR
// ==========================================

const sidebar = document.getElementById("sidebar");

const sidebarMenuBtn =
    document.querySelector(".dashboard-header .menu-btn");

const closeBtn =
    document.querySelector(".close-btn");


// ===== OPEN SIDEBAR =====

if (sidebarMenuBtn && sidebar) {

    sidebarMenuBtn.addEventListener("click", () => {

        sidebar.classList.add("active");

    });

}


// ===== CLOSE SIDEBAR =====

if (closeBtn && sidebar) {

    closeBtn.addEventListener("click", () => {

        sidebar.classList.remove("active");

    });

}


// ==========================================
// CLOSE SIDEBAR WHEN LINK IS CLICKED
// ==========================================

if (sidebar) {

    const sidebarLinks =
        sidebar.querySelectorAll("a");

    sidebarLinks.forEach(link => {

        link.addEventListener("click", () => {

            sidebar.classList.remove("active");

        });

    });

}