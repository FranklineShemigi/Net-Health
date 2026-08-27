// ==========================================
// NET-HEALTH HOMEPAGE
// APPLICATION JAVASCRIPT
// ==========================================


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");


// Check that the elements actually exist
if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


// ==========================================
// CLOSE MOBILE MENU WHEN LINK IS CLICKED
// ==========================================

if (navLinks) {

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}
